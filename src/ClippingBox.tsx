import React from "react";
import { Image } from "react-konva";

const ClippingBoxes: React.FC<{
  currentFrame: CanvasImageSource;
  boxProps: BoxProps;
}> = ({ currentFrame, boxProps }) => {
  return (
    <Image
      {...boxProps} // REVIEW: ここにkeyが展開されるのは余計か？
      image={currentFrame}
      stroke={"black"}
      strokeWidth={10}
      draggable
    />
  );
};

export default ClippingBoxes;
