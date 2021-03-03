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
};

type Flip = {
  horizontal: boolean;
  vertical: boolean;
};

type BoxContainer = {
  key: number;
  boxProps: BoxProps;
  flip: Flip;
};
