import { createContext, Dispatch, SetStateAction, useContext } from "react";

export const boxesPropsContext = createContext<BoxProps[]>([]);
export const setBoxesPropsContext = createContext<
  Dispatch<SetStateAction<BoxProps[]>>
>(() => {});

export const useBoxesProps = () => useContext(boxesPropsContext);
export const useSetBoxesProps = () => useContext(setBoxesPropsContext);
