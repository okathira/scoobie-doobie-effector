import React from "react";
import { Stage, Layer, Image } from "react-konva";
import ClippingBoxes from "./ClippingBoxes";

const OutputArea: React.FC<{
  layoutSize: RectSize;
  baseCanvas: CanvasImageSource;
  boxesProps: BoxProps[];
}> = ({ layoutSize, baseCanvas, boxesProps }) => {
  return (
    <Stage
      className="outputArea"
      width={layoutSize.width}
      height={layoutSize.height}
    >
      <Layer>
        <Image id="baseCanvas" image={baseCanvas} />
        <ClippingBoxes currentFrame={baseCanvas} boxesProps={boxesProps} />
      </Layer>
    </Stage>
  );
};

export default OutputArea;
