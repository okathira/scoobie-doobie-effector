import React from "react";
import { useSetBoxContainers } from "./contextData";

const Controller: React.FC<{
  selectedKeyState: [
    number | undefined,
    React.Dispatch<React.SetStateAction<number | undefined>>
  ];
}> = ({ selectedKeyState }) => {
  const [selectedKey, setSelectedKey] = selectedKeyState;
  const setBoxContainer = useSetBoxContainers();

  const affectSelectedBox = (changeProps: (preProps: BoxProps) => BoxProps) => {
    if (selectedKey === undefined) {
      console.error("No Boxes Selected");
      return;
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

  const deleteSelectedBox = () => {
    if (selectedKey === undefined) {
      console.error("No Boxes Selected");
      return null;
    }

    setBoxContainer((preState) => {
      const newState = new Map(preState);
      if (!newState.delete(selectedKey)) console.error("Not Found");
      return newState;
    });
    setSelectedKey(undefined);
  };

  const bringToFront = () => {
    if (selectedKey === undefined) {
      console.error("No Boxes Selected");
      return;
    }

    setBoxContainer((preState) => {
      const selectedBox = preState.get(selectedKey);
      if (!selectedBox) {
        console.error("Not Found");
        return new Map(preState);
      }

      const newState = new Map(preState);
      newState.delete(selectedKey);
      newState.set(selectedKey, selectedBox);

      return newState;
    });
  };

  const SendToBack = () => {
    if (selectedKey === undefined) {
      console.error("No Boxes Selected");
      return;
    }

    setBoxContainer((preState) => {
      const selectedBox = preState.get(selectedKey);

      if (!selectedBox) {
        console.error("Not Found");
        return new Map(preState);
      }

      const newState = new Map([
        [selectedKey, selectedBox],
        ...Array.from(preState),
      ]);

      return newState;
    });
  };

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setSelectedKey(undefined);
          }}
          disabled={selectedKey === undefined}
        >
          選択解除
        </button>
        <button
          onClick={() => {
            deleteSelectedBox();
          }}
          disabled={selectedKey === undefined}
        >
          削除
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            affectSelectedBox(flipHorizontally);
          }}
          disabled={selectedKey === undefined}
        >
          左右反転
        </button>
        <button
          onClick={() => {
            affectSelectedBox(flipVertically);
          }}
          disabled={selectedKey === undefined}
        >
          上下反転
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            bringToFront();
          }}
          disabled={selectedKey === undefined}
        >
          最前面へ
        </button>
        <button
          onClick={() => {
            SendToBack();
          }}
          disabled={selectedKey === undefined}
        >
          最背面へ
        </button>
      </div>
    </div>
  );
};

export default Controller;
