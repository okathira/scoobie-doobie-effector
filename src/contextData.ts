import { createContext, Dispatch, SetStateAction, useContext } from "react";

export const boxContainersContext = createContext<BoxContainer[]>([]);
export const setBoxContainersContext = createContext<
  Dispatch<SetStateAction<BoxContainer[]>>
>(() => {});

export const useBoxContainers = () => useContext(boxContainersContext);
export const useSetBoxContainers = () => useContext(setBoxContainersContext);
