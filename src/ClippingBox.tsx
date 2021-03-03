import React, { useEffect, useRef } from "react";
import { Image, Transformer } from "react-konva";

import Konva from "konva";
import { minimumBoxSize } from "./defaultConfig";

const ClippingBoxes: React.FC<{
  currentFrame: CanvasImageSource;
  boxProps: BoxProps;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newProps: BoxProps) => void;
}> = ({ currentFrame, boxProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef<Konva.Image>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    // trasformerは手動でアタッチしなければならない
    if (isSelected) {
      transformerRef.current?.nodes([shapeRef.current!]);
      transformerRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Image
        ref={shapeRef}
        onClick={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...boxProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          // transformerはnodeのscaleを変更し、widthとheightはそのまま。
          // しかし、データの管理を容易にするため、変形終了時にスケールをリセットする。
          const node = shapeRef.current!;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // もとに戻す
          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...boxProps,
            x: node.x(),
            y: node.y(),
            // 最小値を指定する
            width: Math.max(minimumBoxSize, node.width() * scaleX),
            height: Math.max(minimumBoxSize, node.height() * scaleY),
          });
        }}
        {...boxProps}
        image={currentFrame}
        stroke={"black"}
        strokeWidth={10}
        strokeScaleEnabled={false}
        draggable
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            // リサイズ制限
            return newBox.width < minimumBoxSize ||
              newBox.height < minimumBoxSize
              ? oldBox
              : newBox;
          }}
          rotateEnabled={false}
          ignoreStroke={true}
          padding={5} // strokeWidth /2
        />
      )}
    </>
  );
};

export default ClippingBoxes;
