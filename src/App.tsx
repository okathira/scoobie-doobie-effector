import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const layoutSize = {
  width: 640,
  height: 360,
};

const App: React.FC = () => {
  const [frameInterval, setFrameInterval]: [
    NodeJS.Timeout | undefined,
    React.Dispatch<React.SetStateAction<NodeJS.Timeout | undefined>>
  ] = useState();

  const cameraRef = useRef<Webcam>(null);
  const baseImageRef = useRef<HTMLCanvasElement>(null);

  const refreshFrame = () => {
    const ctx = baseImageRef.current?.getContext("2d")!;
    ctx.drawImage(
      cameraRef.current!.video!,
      0,
      0,
      layoutSize.width,
      layoutSize.height
    );

    const image = ctx?.getImageData(0, 0, layoutSize.width, layoutSize.height);
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

    ctx.putImageData(image, 0, 0);
  };

  useEffect(() => {
    if (!frameInterval)
      setFrameInterval(setInterval(() => refreshFrame(), 1000 / 30));

    return () => {
      clearInterval(frameInterval!);
    };
  }, [frameInterval]);

  return (
    <section className="App">
      <Webcam
        id="camera"
        ref={cameraRef}
        audio={false}
        videoConstraints={videoConstraints}
        width={layoutSize.width}
        height={layoutSize.height}
      />
      <canvas
        id="outputArea"
        ref={baseImageRef}
        width={layoutSize.width}
        height={layoutSize.height}
      />
    </section>
  );
};

export default App;
