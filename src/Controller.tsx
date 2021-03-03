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

  return (
    <div>
      <button>左右反転</button>
      <button>上下反転</button>
    </div>
  );
};

export default Controller;
