import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { Stage, Layer, Image } from "react-konva";

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
  const [BaseCanvas, setBaseCanvas] = useState(
    document.createElement("canvas")
  );
  const [frameInterval, setFrameInterval]: [
    NodeJS.Timeout | undefined,
    React.Dispatch<React.SetStateAction<NodeJS.Timeout | undefined>>
  ] = useState();

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
    setBaseCanvas(canvas);
  };

  useEffect(() => {
    if (!frameInterval)
      setFrameInterval(
        setInterval(
          () => refreshFrame(), //refreshFrame(baseImageRef.current?.getContext("2d")!),
          1000 / 30
        )
      );

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
      />
      <Stage
        id="outputArea"
        width={layoutSize.width}
        height={layoutSize.height}
      >
        <Layer>
          <Image id="baseCanvas" image={BaseCanvas} />
        </Layer>
      </Stage>
    </section>
  );
};

export default App;
