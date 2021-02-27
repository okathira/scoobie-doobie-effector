import React, { useState } from "react";
import { Layer, Image } from "react-konva";
import ClippingBox from "./ClippingBox";
import { useBoxesProps, useSetBoxesProps } from "./contextData";

const Exhibition: React.FC<{
  currentFrame: CanvasImageSource;
}> = ({ currentFrame }) => {
  const [selectedKey, setSelectedKey] = useState<number>();

  const boxesProps = useBoxesProps();
  const setBoxesProps = useSetBoxesProps();

  const checkDeselect = () => {
    // 背景をクリックしたとき選択を解除
    setSelectedKey(undefined);
  };

  return (
    <Layer>
      <Image image={currentFrame} onMouseDown={checkDeselect} />
      {(() =>
        boxesProps.map((boxProps, i) => (
          <ClippingBox
            key={boxProps.key}
            boxProps={boxProps}
            currentFrame={currentFrame}
            isSelected={boxProps.key === selectedKey}
            onSelect={() => {
              setSelectedKey(boxProps.key);
            }}
            onChange={(newProps: BoxProps) => {
              const boxes = [...boxesProps];
              boxes[i] = newProps;
              setBoxesProps(boxes);
            }}
          />
        )))()}
    </Layer>
  );
};

export default Exhibition;
