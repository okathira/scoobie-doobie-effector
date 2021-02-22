import React from "react";
import { Stage, Layer, Image } from "react-konva";
import ClippingBoxes from "./ClippingBoxes";
import { useBoxesProps } from "./contextData";

const OutputArea: React.FC<{
  layoutSize: RectSize;
  baseCanvas: CanvasImageSource;
}> = ({ layoutSize, baseCanvas }) => {
  // TODO: 子に渡しているだけのため消したい
  const boxesProps = useBoxesProps();

  return (
    <Stage
      className="output-area"
      width={layoutSize.width}
      height={layoutSize.height}
    >
      <Layer>
        <Image image={baseCanvas} />
        <ClippingBoxes currentFrame={baseCanvas} boxesProps={boxesProps} />
      </Layer>
    </Stage>
  );
};

export default OutputArea;
