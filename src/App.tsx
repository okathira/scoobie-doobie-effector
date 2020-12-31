import React, { useState, useRef, useCallback, useMemo } from "react";
import Webcam from "react-webcam";
import { Stage, Layer } from "react-konva";

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
  return <section className="App">app</section>;
  return (
    <section className="App">
      <Webcam
        id="camera"
        audio={false}
        videoConstraints={videoConstraints}
        width={layoutSize.width}
        height={layoutSize.height}
      />
      <Stage id="outputArea">
        <Layer></Layer>
      </Stage>
    </section>
  );
};

export default App;
