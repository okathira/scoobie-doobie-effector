import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import InputArea from "./InputArea";
import OutputArea from "./OutputArea";
import { setBoxesPropsContext, boxesPropsContext } from "./contextData";

import { createCanvas, makeGrayscale } from "./canvasFunctions";
import { cameraSize, videoConstraints } from "./defaultConfig";

const App: React.FC = () => {
  const [baseCanvas, setBaseCanvas] = useState(createCanvas(cameraSize));
  const [boxesProps, setBoxesProps] = useState<BoxProps[]>([
    {
      key: 0,
      srcX: 50,
      srcY: 100,
      srcWidth: 1000,
      srcHeight: 500,
      showX: 50,
      showY: 100,
      showWidth: 1000,
      showHeight: 500,
    },
  ]);

  const cameraRef = useRef<Webcam>(null);
  const frameInterval = useRef<NodeJS.Timeout>();

  const FPS = 60;
  useEffect(() => {
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
      <setBoxesPropsContext.Provider value={setBoxesProps}>
        <InputArea layoutSize={cameraSize} />
      </setBoxesPropsContext.Provider>
      <boxesPropsContext.Provider value={boxesProps}>
        <OutputArea layoutSize={cameraSize} baseCanvas={baseCanvas} />
      </boxesPropsContext.Provider>
    </section>
  );
};

export default App;
