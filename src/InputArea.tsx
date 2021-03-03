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

  const addBoxContainer = () => {
    const mouseUpPos = getRelativePointerPosition(inputAreaRef) ?? {
      x: 0,
      y: 0,
    };

    setBoxContainers((preState) => [
      ...preState,
      ((): BoxContainer => {
        // 左上頂点で座標を管理
        const x = Math.min(mouseDownPos.x, mouseUpPos.x);
        const y = Math.min(mouseDownPos.y, mouseUpPos.y);
        const width = Math.abs(mouseDownPos.x - mouseUpPos.x) + 1;
        const height = Math.abs(mouseDownPos.y - mouseUpPos.y) + 1;
        const boxProps: BoxProps = {
          cropX: x,
          cropY: y,
          cropWidth: width,
          cropHeight: height,
          x,
          y,
          width,
          height,
        };

        return {
          key: preState.length, // TODO: 要素の削除に対応させる
          boxProps,
          flip: {
            horizontal: false,
            vertical: false,
          },
        };
      })(),
    ]);
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
        addBoxContainer();
        setDragging(false);
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
