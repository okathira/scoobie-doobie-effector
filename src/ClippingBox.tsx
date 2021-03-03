import React, { useEffect, useRef } from "react";
import { Image, Transformer } from "react-konva";

import Konva from "konva";

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

          // FIXME: 変形後の一瞬だけ直前の座標で描画されてちらつく
          onChange({
            ...boxProps,
            x: node.x(),
            y: node.y(),
            scaleX,
            scaleY,
          });
        }}
        {...boxProps}
        offset={{
          x: shapeRef.current?.width()! / 2,
          y: shapeRef.current?.height()! / 2,
        }}
        image={currentFrame}
        stroke={"black"}
        strokeWidth={10}
        strokeScaleEnabled={false}
        draggable
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          rotateEnabled={false}
          ignoreStroke={true}
          padding={5} // strokeWidth /2
        />
      )}
    </>
  );
};

export default ClippingBoxes;
