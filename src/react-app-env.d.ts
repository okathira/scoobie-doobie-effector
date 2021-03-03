/// <reference types="react-scripts" />

type RectSize = {
  width: number;
  height: number;
};

type BoxProps = {
  cropX: number;
  cropY: number;
  cropWidth: number;
  cropHeight: number;
  x: number;
  y: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
};

type BoxContainer = {
  key: number;
  boxProps: BoxProps;
};
