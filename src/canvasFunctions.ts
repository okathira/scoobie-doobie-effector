export const createCanvas = (size: RectSize) => {
  const canvas = document.createElement("canvas");
  canvas.width = size.width;
  canvas.height = size.height;

  return canvas;
};

// グレイスケールならCSSでもできる。その場合はcanvasごとにフィルターがかかるため構造を変える必要がありそう。
export const makeGrayscale = (image: ImageData) => {
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
};
