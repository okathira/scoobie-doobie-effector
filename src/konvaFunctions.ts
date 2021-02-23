import Konva from "konva";
import { Vector2d } from "konva/types/types";

const getRelativePointerPosition = (
  ref: React.RefObject<Konva.Stage>
): Vector2d | null => {
  if (!ref.current) return null;
  const node = ref.current;
  const transform = node.getAbsoluteTransform().copy();
  transform.invert();
  const pos = node.getStage().getPointerPosition()!;

  return transform.point(pos);
};

export { getRelativePointerPosition };
