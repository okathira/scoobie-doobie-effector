import React from "react";
import { Layer, Image } from "react-konva";
import ClippingBox from "./ClippingBox";
import { useBoxesProps } from "./contextData";

const Exhibition: React.FC<{
  currentFrame: CanvasImageSource;
}> = ({ currentFrame }) => {
  const boxesProps = useBoxesProps();

  return (
    <Layer>
      <Image image={currentFrame} />
      {(() =>
        boxesProps.map((boxProps) => (
          <ClippingBox
            key={boxProps.key}
            boxProps={boxProps}
            currentFrame={currentFrame}
          />
        )))()}
    </Layer>
  );
};

export default Exhibition;
