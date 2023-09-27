import {createReducer, on} from "@ngrx/store";
import {CanvasStore} from "./types";
import {clear, draw, paste} from "./canvas.actions";
import {getChangedCanvas} from "../util/canvasUtil";

const canvas: Array<number> = [];
export const canvasSize = 28;
export const pixelSize = `${70 / 28}vh`;

for(let i = 0; i < canvasSize * canvasSize; i++) {
  canvas.push(0);
}

const initialState: CanvasStore = {canvas};

export const canvasReducer = createReducer(
  initialState,

  on(draw, (state, {index, erase = false}) => {
    const canvas = getChangedCanvas(state, index, erase);
    return {canvas};
  }),
  on(clear, () => {
    return initialState;
  }),
  on(paste, (state, {canvas}) => {
    return {canvas};
  })
);
