import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import InputArea from "./InputArea";
import OutputArea from "./OutputArea";

import { createCanvas, makeGrayscale } from "./canvasFunctions";
import { cameraSize, videoConstraints } from "./defaultConfig";

const App: React.FC = () => {
  const [baseCanvas, setBaseCanvas] = useState(createCanvas(cameraSize));
  const [frameInterval, setFrameInterval] = useState<NodeJS.Timeout>();
  const [boxesProps, setBoxesProps] = useState<BoxProps[]>([]);

  const cameraRef = useRef<Webcam>(null);

  const refreshFrame = () => {
    const ctx = createCanvas(cameraSize).getContext("2d")!;
    ctx.drawImage(cameraRef.current!.video!, 0, 0);

    const image = ctx.getImageData(0, 0, cameraSize.width, cameraSize.height);
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
