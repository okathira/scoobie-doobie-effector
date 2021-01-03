import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { Stage } from "react-konva";
import ClippingBoxes, { BoxProps } from "./ClippingBoxes";

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

  const cameraRef = useRef<Webcam>(null);

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

  return (
    <section className="App">
      <Webcam
        id="camera"
        ref={cameraRef}
        audio={false}
        videoConstraints={videoConstraints}
        width={layoutSize.width}
        height={layoutSize.height}
        onClick={(e) =>
          setBoxesProps([
            ...boxesProps,
            {
              key: boxesProps.length,
              showX: e.clientX,
              showY: e.clientY,
              showWidth: e.clientX,
              showHeight: e.clientY,
            },
          ])
        }
      />
      <Stage
        id="outputArea"
        width={layoutSize.width}
        height={layoutSize.height}
      >
        <ClippingBoxes currentFrame={baseCanvas} boxesProps={boxesProps} />
      </Stage>
    </section>
  );
};

export default App;
