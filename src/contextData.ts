import { createContext, Dispatch, SetStateAction, useContext } from "react";

export const boxContainersContext = createContext<Map<number, BoxProps>>(
  new Map()
);
export const setBoxContainersContext = createContext<
  Dispatch<SetStateAction<Map<number, BoxProps>>>
>(() => {});

export const useBoxContainers = () => useContext(boxContainersContext);
export const useSetBoxContainers = () => useContext(setBoxContainersContext);
