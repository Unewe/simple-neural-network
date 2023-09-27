import {canvasSize} from "../store/canvas.reducer";
import {CanvasStore} from "../store/types";

export const canvasMaxCoefficient = 1;
export const canvasMidCoefficient = 0.1;
export const canvasLowCoefficient = 0.02;

export const getChangedCanvas = (state: CanvasStore, index: number, erase: boolean = false): Array<number> => {
  const leftCorner = (index) % canvasSize === 0;
  const rightCorner = (index + 1) % canvasSize === 0;
  const canvas = [...state.canvas];

  canvas[index] = erase ? 0 : canvas[index] + canvasMaxCoefficient;

  if (index - canvasSize > 0) {
    canvas[index - canvasSize] = erase ? 0 : canvas[index - canvasSize] + canvasMidCoefficient;
    if (!leftCorner) {
      canvas[index - canvasSize - 1] = erase ? 0 : canvas[index - canvasSize - 1] + canvasLowCoefficient;
    }
    if (!rightCorner) {
      canvas[index - canvasSize + 1] = erase ? 0 : canvas[index - canvasSize + 1] + canvasLowCoefficient;
    }
  }

  if (index + canvasSize < canvasSize * canvasSize) {
    canvas[index + canvasSize] = erase ? 0 : canvas[index + canvasSize] + canvasMidCoefficient;
    if (!leftCorner) {
      canvas[index + canvasSize - 1] = erase ? 0 : canvas[index + canvasSize - 1] + canvasLowCoefficient;
    }

    if (!rightCorner) {
      canvas[index + canvasSize + 1] = erase ? 0 : canvas[index + canvasSize + 1] + canvasLowCoefficient;
    }
  }

  if (!leftCorner) {
    canvas[index - 1] = erase ? 0 : canvas[index - 1] + canvasMidCoefficient;
  }
  if (!rightCorner) {
    canvas[index + 1] = erase ? 0 : canvas[index + 1] + canvasMidCoefficient;
  }

  if (canvas[index - canvasSize] > 1) canvas[index - canvasSize] = 1;
  if (canvas[index - canvasSize - 1] > 1) canvas[index - canvasSize - 1] = 1;
  if (canvas[index - canvasSize + 1] > 1) canvas[index - canvasSize + 1] = 1;
  if (canvas[index + canvasSize] > 1) canvas[index + canvasSize] = 1;
  if (canvas[index + canvasSize - 1] > 1) canvas[index + canvasSize - 1] = 1;
  if (canvas[index + canvasSize + 1] > 1) canvas[index + canvasSize + 1] = 1;
  if (canvas[index - 1] > 1) canvas[index - 1] = 1;
  if (canvas[index + 1] > 1) canvas[index + 1] = 1;

  return canvas;
}
