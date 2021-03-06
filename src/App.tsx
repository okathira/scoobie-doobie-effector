import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import InputArea from "./InputArea";
import OutputArea from "./OutputArea";
import { setBoxContainersContext, boxContainersContext } from "./contextData";

import { createCanvas, makeGrayscale } from "./canvasFunctions";
import { cameraSize, videoConstraints } from "./defaultConfig";

const App: React.FC = () => {
  const [baseCanvas, setBaseCanvas] = useState(createCanvas(cameraSize));
  const [BoxContainers, setBoxContainers] = useState<Map<number, BoxProps>>(
    new Map()
  );

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
      <setBoxContainersContext.Provider value={setBoxContainers}>
        <boxContainersContext.Provider value={BoxContainers}>
          <InputArea layoutSize={cameraSize} />
          <OutputArea layoutSize={cameraSize} baseCanvas={baseCanvas} />
        </boxContainersContext.Provider>
      </setBoxContainersContext.Provider>
    </section>
  );
};

export default App;
