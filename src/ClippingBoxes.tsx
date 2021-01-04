import React from "react";
import { Layer, Image } from "react-konva";

export type BoxProps = {
  key: number;
  srcX: number;
  srcY: number;
  srcWidth: number;
  srcHeight: number;
  showX: number;
  showY: number;
  showWidth: number;
  showHeight: number;
};

const ClippingBoxes: React.FC<{
  currentFrame: CanvasImageSource;
  boxesProps: BoxProps[];
}> = ({ currentFrame, boxesProps }) => {
  return (
    <Layer>
      <Image id="baseCanvas" image={currentFrame} />
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
    </Layer>
  );
};

export default ClippingBoxes;
