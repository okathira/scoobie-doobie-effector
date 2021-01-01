import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { Stage } from "react-konva";
import ClippingBoxes, { BoxProps } from "./ClippingBoxes";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const layoutSize = {
  width: 640,
  height: 360,
};

const getGrayscale = (image: ImageData) => {
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

  return image;
};

const App: React.FC = () => {
  const [baseCanvas, setBaseCanvas] = useState(
    document.createElement("canvas")
  );
  const [frameInterval, setFrameInterval]: [
    NodeJS.Timeout | undefined,
    React.Dispatch<React.SetStateAction<NodeJS.Timeout | undefined>>
  ] = useState();
  const [boxesProps, setBoxesProps] = useState<BoxProps[]>([]);

  const cameraRef = useRef<Webcam>(null);

  const refreshFrame = () => {
    const canvas = document.createElement("canvas");
    canvas.width = layoutSize.width;
    canvas.height = layoutSize.height;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(
      cameraRef.current!.video!,
      0,
      0,
      layoutSize.width,
      layoutSize.height
    );

    const image = ctx.getImageData(0, 0, layoutSize.width, layoutSize.height);
    ctx.putImageData(getGrayscale(image), 0, 0);

    setBaseCanvas(canvas);
  };

  useEffect(() => {
    if (!frameInterval)
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
