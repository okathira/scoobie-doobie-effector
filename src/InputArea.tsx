import React, { useState, useRef } from "react";
import { Layer, Stage, Rect } from "react-konva";

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
  boxesProps: BoxProps[];
  setBoxesProps: React.Dispatch<React.SetStateAction<BoxProps[]>>;
}> = ({ layoutSize, boxesProps, setBoxesProps }) => {
  const [mouseDownPos, setMouseDownPos] = useState<Vector2d>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<Boolean>(false);

  const inputAreaRef = useRef<Konva.Stage>(null);

  const addBoxProps = () => {
    const relativePos = getRelativePointerPosition(inputAreaRef) || {
      x: 0,
      y: 0,
    };
    setBoxesProps([
      ...boxesProps,
      {
        key: boxesProps.length,
        srcX: relativePos.x,
        srcY: relativePos.y,
        srcWidth: mouseDownPos.x - relativePos.x,
        srcHeight: mouseDownPos.y - relativePos.y,
        showX: relativePos.x,
        showY: relativePos.y,
        showWidth: mouseDownPos.x - relativePos.x,
        showHeight: mouseDownPos.y - relativePos.y,
      },
    ]);
  };

  return (
    <Stage
      className="inputArea"
      width={layoutSize.width}
      height={layoutSize.height}
      ref={inputAreaRef}
      onMouseDown={() => {
        setMouseDownPos(
          getRelativePointerPosition(inputAreaRef) || { x: 0, y: 0 }
        );
        setDragging(true);
      }}
      onMouseUp={() => {
        addBoxProps();
        setDragging(false);
      }}
    >
      <Layer>
        {dragging ? (
          <SelectionRect
            beginPos={mouseDownPos}
            endPos={getRelativePointerPosition(inputAreaRef) || { x: 0, y: 0 }}
          />
        ) : null}
      </Layer>
    </Stage>
  );
};

export default InputArea;
