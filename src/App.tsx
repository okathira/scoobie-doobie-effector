import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { Stage } from "react-konva";
import ClippingBoxes, { BoxProps } from "./ClippingBoxes";
import { Vector2d } from "konva/types/types";
import Konva from "konva";

type RectSize = {
  width: number;
  height: number;
};

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const layoutSize: RectSize = {
  ...videoConstraints,
};

const createCanvas = (size: RectSize) => {
  const canvas = document.createElement("canvas");
  canvas.width = size.width;
  canvas.height = size.height;

  return canvas;
};

const makeGrayscale = (image: ImageData) => {
  const l = image.data.length / 4;
  for (let i = 0; i < l; i++) {
    const grayscale =
      image.data[i * 4 + 0] * 0.299 +
      image.data[i * 4 + 1] * 0.587 +
      image.data[i * 4 + 2] * 0.114;

    image.data[i * 4 + 0] = grayscale;
    image.data[i * 4 + 1] = grayscale;
    image.data[i * 4 + 2] = grayscale;
  }
};

const App: React.FC = () => {
  const [baseCanvas, setBaseCanvas] = useState(createCanvas(layoutSize));
  const [frameInterval, setFrameInterval] = useState<NodeJS.Timeout>();
  const [boxesProps, setBoxesProps] = useState<BoxProps[]>([]);
  const [mouseDownPos, setMouseDownPos] = useState<Vector2d>({ x: 0, y: 0 });

  const cameraRef = useRef<Webcam>(null);
  const inputAreaRef = useRef<Konva.Stage>(null);

  const refreshFrame = () => {
    const ctx = createCanvas(layoutSize).getContext("2d")!;
    ctx.drawImage(cameraRef.current!.video!, 0, 0);

    const image = ctx.getImageData(0, 0, layoutSize.width, layoutSize.height);
    makeGrayscale(image);
    ctx.putImageData(image, 0, 0);

    setBaseCanvas(ctx.canvas);
  };

  useEffect(() => {
    setFrameInterval(setInterval(() => refreshFrame(), 1000 / 30));

    return () => {
      clearInterval(frameInterval!);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRelativePointerPosition = () => {
    const node = inputAreaRef.current!;
    const transform = node.getAbsoluteTransform().copy();
    transform.invert();
    const pos = node.getStage().getPointerPosition()!;

    return transform.point(pos);
  };

  return (
    <section className="App">
      <Webcam
        id="camera"
        ref={cameraRef}
        audio={false}
        videoConstraints={videoConstraints}
        width={layoutSize.width}
        height={layoutSize.height}
        style={{ position: "absolute" }}
      />
      <Stage
        className="inputArea"
        ref={inputAreaRef}
        width={layoutSize.width}
        height={layoutSize.height}
        onMouseDown={(e) => {
          setMouseDownPos({ x: e.evt.clientX, y: e.evt.clientY });
        }}
        onClick={(e) => {
          const relativePos = getRelativePointerPosition();
          setBoxesProps([
            ...boxesProps,
            {
              key: boxesProps.length,
              srcX: relativePos.x,
              srcY: relativePos.y,
              srcWidth: mouseDownPos.x - e.evt.clientX,
              srcHeight: mouseDownPos.y - e.evt.clientY,
              showX: relativePos.x,
              showY: relativePos.y,
              showWidth: mouseDownPos.x - e.evt.clientX,
              showHeight: mouseDownPos.y - e.evt.clientY,
            },
          ]);
        }}
      ></Stage>
      <Stage
        className="outputArea"
        width={layoutSize.width}
        height={layoutSize.height}
      >
        <ClippingBoxes currentFrame={baseCanvas} boxesProps={boxesProps} />
      </Stage>
    </section>
  );
};

export default App;
