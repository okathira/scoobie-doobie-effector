import React, { useState, useRef } from "react";
import { Layer, Stage, Rect } from "react-konva";
import { useSetBoxContainers } from "./contextData";

import Konva from "konva";
import { Vector2d } from "konva/types/types";
import { getRelativePointerPosition } from "./konvaFunctions";

const SelectionRect: React.FC<{
  beginPos: Vector2d;
  endPos: Vector2d;
}> = ({ beginPos, endPos }) => {
  return (
    <Rect
      x={beginPos.x}
      y={beginPos.y}
      width={endPos.x - beginPos.x}
      height={endPos.y - beginPos.y}
      fill={"blue"}
      stroke={"red"}
      opacity={0.2}
    />
  );
};

const InputArea: React.FC<{
  layoutSize: RectSize;
}> = ({ layoutSize }) => {
  const setBoxContainers = useSetBoxContainers();
  const [mouseDownPos, setMouseDownPos] = useState<Vector2d>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<Boolean>(false);

  const inputAreaRef = useRef<Konva.Stage>(null);
  const idNum = useRef<number>(0);

  const addBoxContainer = () => {
    const mouseUpPos = getRelativePointerPosition(inputAreaRef) ?? {
      x: 0,
      y: 0,
    };

    setBoxContainers(
      (preState): Map<number, BoxProps> => {
        // 左上頂点で座標を管理
        const x = Math.min(mouseDownPos.x, mouseUpPos.x);
        const y = Math.min(mouseDownPos.y, mouseUpPos.y);
        const width = Math.abs(mouseDownPos.x - mouseUpPos.x) + 1;
        const height = Math.abs(mouseDownPos.y - mouseUpPos.y) + 1;
        // 表示時は反転に備えて中心座標で管理
        const newProps: BoxProps = {
          cropX: x,
          cropY: y,
          cropWidth: width,
          cropHeight: height,
          x: x + width / 2,
          y: y + height / 2,
          width,
          height,
          scaleX: 1,
          scaleY: 1,
        };

        const newState = new Map(preState);
        newState.set(idNum.current, newProps);
        idNum.current++;

        return newState;
      }
    );
  };

  return (
    <Stage
      className="input-area"
      width={layoutSize.width}
      height={layoutSize.height}
      ref={inputAreaRef}
      onMouseDown={() => {
        setMouseDownPos(
          getRelativePointerPosition(inputAreaRef) ?? { x: 0, y: 0 }
        );
        setDragging(true);
      }}
      onMouseUp={() => {
        setDragging(false);
        addBoxContainer(); // stateを変更してからでないとidNumが2回動いてしまうためこの順番
      }}
    >
      <Layer>
        {dragging ? (
          <SelectionRect
            beginPos={mouseDownPos}
            endPos={getRelativePointerPosition(inputAreaRef) ?? { x: 0, y: 0 }}
            // FIXME: endPosの更新タイミングで描画されず、baseCanvasの更新により描画されている。
          />
        ) : null}
      </Layer>
    </Stage>
  );
};

export default InputArea;
