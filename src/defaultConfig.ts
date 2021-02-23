import Webcam from "react-webcam";

export const videoConstraints: Webcam["props"]["videoConstraints"] = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export const cameraSize = {
  ...videoConstraints,
} as RectSize;
