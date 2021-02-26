import React from "react";
import { Image } from "react-konva";
import { useBoxesProps } from "./contextData";

const ClippingBoxes: React.FC<{
  currentFrame: CanvasImageSource;
}> = ({ currentFrame }) => {
  const boxesProps = useBoxesProps();

  return (
    <>
      {(() =>
        boxesProps.map((boxProps) => (
          <Image
            {...boxProps}
            image={currentFrame}
            stroke={"black"}
            strokeWidth={10}
            draggable
          />
        )))()}
    </>
  );
};

export default ClippingBoxes;
