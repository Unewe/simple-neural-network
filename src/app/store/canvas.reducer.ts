import {createReducer, on} from "@ngrx/store";
import {CanvasStore} from "./types";
import {clear, draw, paste} from "./canvas.actions";

const canvas: Array<number> = [];
export const canvasSize = 24;
export const pixelSize = 20;

for(let i = 0; i < canvasSize * canvasSize; i++) {
  canvas.push(0);
}

const initialState: CanvasStore = {canvas};

export const canvasReducer = createReducer(
  initialState,

  on(draw, (state, {index}) => {
    const canvas = [...state.canvas];
    canvas[index] += 0.3;
    canvas[index - canvasSize] += 0.1;
    canvas[index - canvasSize - 1] += 0.01;
    canvas[index - canvasSize + 1] += 0.01;
    canvas[index + canvasSize] += 0.1;
    canvas[index + canvasSize - 1] += 0.01;
    canvas[index + canvasSize + 1] += 0.01;
    canvas[index - 1] += 0.1;
    canvas[index + 1] += 0.1;

    if (canvas[index - canvasSize] > 1) canvas[index - canvasSize] = 1;
    if (canvas[index - canvasSize - 1] > 1) canvas[index - canvasSize - 1] = 1;
    if (canvas[index - canvasSize + 1] > 1) canvas[index - canvasSize + 1] = 1;
    if (canvas[index + canvasSize] > 1) canvas[index + canvasSize] = 1;
    if (canvas[index + canvasSize - 1] > 1) canvas[index + canvasSize - 1] = 1;
    if (canvas[index + canvasSize + 1] > 1) canvas[index + canvasSize + 1] = 1;
    if (canvas[index - 1] > 1) canvas[index - 1] = 1;
    if (canvas[index + 1] > 1) canvas[index + 1] = 1;
    return {canvas};
  }),
  on(clear, () => {
    return initialState;
  }),
  on(paste, (state, {canvas}) => {
    return {canvas};
  })
);
