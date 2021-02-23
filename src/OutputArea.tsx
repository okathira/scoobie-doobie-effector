import React from "react";
import { Stage, Layer, Image } from "react-konva";
import ClippingBoxes from "./ClippingBoxes";
import { useBoxesProps, boxesPropsContext } from "./contextData";

const OutputArea: React.FC<{
  layoutSize: RectSize;
  baseCanvas: CanvasImageSource;
}> = ({ layoutSize, baseCanvas }) => {
  // Contextは<Stage>を通り抜けないためブリッジする必要がある
  const boxesProps = useBoxesProps();

  return (
    <Stage
      className="output-area"
      width={layoutSize.width}
      height={layoutSize.height}
    >
      <boxesPropsContext.Provider value={boxesProps}>
        <Layer>
          <Image image={baseCanvas} />
          <ClippingBoxes currentFrame={baseCanvas} />
        </Layer>
      </boxesPropsContext.Provider>
    </Stage>
  );
};

export default OutputArea;
