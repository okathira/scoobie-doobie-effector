import React from "react";
import { Image } from "react-konva";
import { useBoxesProps } from "./contextData";

const ClippingBoxes: React.FC<{
  currentFrame: CanvasImageSource;
  _boxesProps: BoxProps[]; // TODO: コンテキストにするとレンダリングされないのを治す
}> = ({ currentFrame, _boxesProps }) => {
  const boxesProps = useBoxesProps();

  return (
    <>
      {(() =>
        // _boxesProps
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
