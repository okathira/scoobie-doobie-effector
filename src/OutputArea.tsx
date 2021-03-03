import React, { useState } from "react";
import { Stage } from "react-konva";
import Exhibition from "./Exhibition";
import Controller from "./Controller";
import {
  useBoxContainers,
  boxContainersContext,
  useSetBoxContainers,
  setBoxContainersContext,
} from "./contextData";

const OutputArea: React.FC<{
  layoutSize: RectSize;
  baseCanvas: CanvasImageSource;
}> = ({ layoutSize, baseCanvas }) => {
  // Contextは<Stage>を通り抜けないためブリッジする必要がある
  const boxContainers = useBoxContainers();
  const setBoxContainers = useSetBoxContainers();

  const selectedKeyState = useState<number>();

  return (
    <>
      <Stage
        className="output-area"
        width={layoutSize.width}
        height={layoutSize.height}
      >
        <setBoxContainersContext.Provider value={setBoxContainers}>
          <boxContainersContext.Provider value={boxContainers}>
            <Exhibition
              currentFrame={baseCanvas}
              selectedKeyState={selectedKeyState}
            />
          </boxContainersContext.Provider>
        </setBoxContainersContext.Provider>
      </Stage>
      <Controller selectedKeyState={selectedKeyState} />
    </>
  );
};

export default OutputArea;
