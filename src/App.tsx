import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";

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
  const [inputFrameSrc, setInputFrameSrc] = useState("");
  const [frameInterval, setFrameInterval]: [
    NodeJS.Timeout | undefined,
    React.Dispatch<React.SetStateAction<NodeJS.Timeout | undefined>>
  ] = useState();

  const cameraRef = useRef<Webcam>(null);

  const refreshFrame = () => {
    setInputFrameSrc(cameraRef.current?.getScreenshot()!);
  };

  useEffect(() => {
    if (!frameInterval)
      setFrameInterval(setInterval(() => refreshFrame(), 1000));

    return () => {
      clearInterval(frameInterval!);
    };
  }, [frameInterval]);

  /*
    const canvas = new HTMLCanvasElement().getContext("2d")!;
    canvas.drawImage(cameraRef.current!.video!, 0, 0);

    const image = canvas.getImageData(
      0,
      0,
      cameraRef.current!.video!.width,
      cameraRef.current!.video!.height
    );

    const l = image.data.length / 4;
    for (let i = 0; i < l; i++) {
      const grayscale =
        image.data[i * 4 + 0] * 0.2126 +
        image.data[i * 4 + 1] * 0.7152 +
        image.data[i * 4 + 2] * 0.0722;

      image.data[i * 4 + 0] = grayscale;
      image.data[i * 4 + 1] = grayscale;
      image.data[i * 4 + 2] = grayscale;
    }

    canvas.putImageData(image, 0, 0);

    setBaseImage(baseImage);
    */

  const BaseImage = () => {
    const [image] = useImage(inputFrameSrc);
    return <Image image={image} />;
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
      />
      <Stage
        id="outputArea"
        width={layoutSize.width}
        height={layoutSize.height}
      >
        <Layer>{BaseImage()}</Layer>
      </Stage>
    </section>
  );
};

export default App;
