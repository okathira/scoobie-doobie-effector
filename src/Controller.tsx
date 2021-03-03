import React from "react";
import { useSetBoxContainers } from "./contextData";

const Controller: React.FC<{
  selectedKeyState: [
    number | undefined,
    React.Dispatch<React.SetStateAction<number | undefined>>
  ];
}> = ({ selectedKeyState }) => {
  const [selectedKey] = selectedKeyState;
  const setBoxContainer = useSetBoxContainers();

  // 選択されたClippingBoxのboxPropsを書き換える関数を返す
  const affectSelectedBox = (
    changeProps: (preProps: BoxProps) => BoxProps
  ) => () => {
    if (selectedKey === undefined) {
      console.error("No Boxes Selected");
      return null;
    }

    setBoxContainer((preState) => {
      const preProps = preState.get(selectedKey);
      if (preProps === undefined) {
        console.error("Not Found");
        return preState;
      }

      const newProps: BoxProps = changeProps(preProps);
      const newState = new Map(preState);
      return newState.set(selectedKey, newProps);
    });
  };

  const flipHorizontally = (preProps: BoxProps) => ({
    ...preProps,
    scaleX: -preProps.scaleX,
  });

  const flipVertically = (preProps: BoxProps) => ({
    ...preProps,
    scaleY: -preProps.scaleY,
  });

  return (
    <div>
      <button
        onClick={affectSelectedBox(flipHorizontally)}
        disabled={selectedKey === undefined}
      >
        左右反転
      </button>
      <button
        onClick={affectSelectedBox(flipVertically)}
        disabled={selectedKey === undefined}
      >
        上下反転
      </button>
    </div>
  );
};

export default Controller;
