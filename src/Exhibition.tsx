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
        boxContainers.map((boxContainer, i) => (
          <ClippingBox
            key={boxContainer.key}
            boxProps={boxContainer.boxProps}
            currentFrame={currentFrame}
            isSelected={boxContainer.key === selectedKey}
            onSelect={() => {
              setSelectedKey(boxContainer.key);
            }}
            onChange={(boxProps: BoxProps) => {
              const boxes = [...boxContainers];
              boxes[i] = { ...boxes[i], boxProps }; // REVIEW: 順序が変わったときに対応できるか？
              setBoxContainers(boxes);
            }}
          />
        )))()}
    </Layer>
  );
};

export default Exhibition;
