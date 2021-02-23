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
            key={boxProps.key}
            image={currentFrame}
            crop={{
              x: boxProps.srcX,
              y: boxProps.srcY,
              width: boxProps.srcWidth,
              height: boxProps.srcHeight,
            }}
            x={boxProps.showX}
            y={boxProps.showY}
            width={boxProps.showWidth}
            height={boxProps.showHeight}
            stroke={"black"}
            strokeWidth={10}
            draggable
          />
        )))()}
    </>
  );
};

export default ClippingBoxes;
