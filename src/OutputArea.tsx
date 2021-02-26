import React from "react";
import { Stage } from "react-konva";
import Exhibition from "./Exhibition";
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
        <Exhibition currentFrame={baseCanvas} />
      </boxesPropsContext.Provider>
    </Stage>
  );
};

export default OutputArea;
