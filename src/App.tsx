import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import InputArea from "./InputArea";
import OutputArea from "./OutputArea";

import { createCanvas, makeGrayscale } from "./canvasFunctions";
import { cameraSize, videoConstraints } from "./defaultConfig";

const App: React.FC = () => {
  const [baseCanvas, setBaseCanvas] = useState(createCanvas(cameraSize));
  const [boxesProps, setBoxesProps] = useState<BoxProps[]>([]);

  const cameraRef = useRef<Webcam>(null);
  const frameInterval = useRef<NodeJS.Timeout>();

  const refreshFrame = (canvasSize: RectSize) => {
    if (!(cameraRef.current && cameraRef.current.video)) return;
    const ctx = createCanvas(canvasSize).getContext("2d");

    if (!ctx) return;
    ctx.drawImage(cameraRef.current.video, 0, 0);

    const image = ctx.getImageData(0, 0, canvasSize.width, canvasSize.height);
    makeGrayscale(image);
    ctx.putImageData(image, 0, 0);

    setBaseCanvas(ctx.canvas);
  };

  const FPS = 30;
  useEffect(() => {
    frameInterval.current = setInterval(
      () => refreshFrame(cameraSize),
      1000 / FPS
    );

    return () => {
      clearInterval(frameInterval.current!);
    };
  }, [FPS]);

  return (
    <section id="app">
      <Webcam
        id="camera"
        ref={cameraRef}
        audio={false}
        videoConstraints={videoConstraints}
        width={cameraSize.width}
        height={cameraSize.height}
        style={{ position: "absolute" }}
      />
      <InputArea
        layoutSize={cameraSize}
        boxesProps={boxesProps}
        setBoxesProps={setBoxesProps}
      />
      <OutputArea
        layoutSize={cameraSize}
        baseCanvas={baseCanvas}
        boxesProps={boxesProps}
      />
    </section>
  );
};

export default App;
