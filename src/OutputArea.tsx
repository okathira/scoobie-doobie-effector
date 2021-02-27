import React from "react";
import { Stage } from "react-konva";
import Exhibition from "./Exhibition";
import {
  useBoxesProps,
  boxesPropsContext,
  useSetBoxesProps,
  setBoxesPropsContext,
} from "./contextData";

const OutputArea: React.FC<{
  layoutSize: RectSize;
  baseCanvas: CanvasImageSource;
}> = ({ layoutSize, baseCanvas }) => {
  // Contextは<Stage>を通り抜けないためブリッジする必要がある
  const boxesProps = useBoxesProps();
  const setBoxesProps = useSetBoxesProps();

  return (
    <Stage
      className="output-area"
      width={layoutSize.width}
      height={layoutSize.height}
    >
      <setBoxesPropsContext.Provider value={setBoxesProps}>
        <boxesPropsContext.Provider value={boxesProps}>
          <Exhibition currentFrame={baseCanvas} />
        </boxesPropsContext.Provider>
      </setBoxesPropsContext.Provider>
    </Stage>
  );
};

export default OutputArea;
