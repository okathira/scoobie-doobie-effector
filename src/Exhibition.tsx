import React from "react";
import { Layer, Image } from "react-konva";
import ClippingBox from "./ClippingBox";
import { useBoxContainers, useSetBoxContainers } from "./contextData";

const Exhibition: React.FC<{
  currentFrame: CanvasImageSource;
  selectedKeyState: [
    number | undefined,
    React.Dispatch<React.SetStateAction<number | undefined>>
  ];
}> = ({ currentFrame, selectedKeyState }) => {
  const [selectedKey, setSelectedKey] = selectedKeyState;

  const boxContainers = useBoxContainers();
  const setBoxContainers = useSetBoxContainers();

  const checkDeselect = () => {
    // 背景をクリックしたとき選択を解除
    setSelectedKey(undefined);
  };

  return (
    <Layer>
      <Image image={currentFrame} onMouseDown={checkDeselect} />
      {(() =>
        Array.from(boxContainers).map(([key, boxProps]) => (
          <ClippingBox
            key={key}
            boxProps={boxProps}
            currentFrame={currentFrame}
            isSelected={key === selectedKey}
            onSelect={() => {
              setSelectedKey(key);
            }}
            onChange={(boxProps: BoxProps) => {
              const newState = new Map(boxContainers);
              newState.set(key, boxProps);
              setBoxContainers(newState);
            }}
          />
        )))()}
    </Layer>
  );
};

export default Exhibition;
