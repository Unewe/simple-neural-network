import {createAction, props} from "@ngrx/store";

export const draw = createAction('[Canvas Component] Draw', props<{index: number, erase?: boolean}>());
export const paste = createAction('[Canvas Component] Paste', props<{canvas: Array<number>}>());
export const clear = createAction('[Canvas Component] Clear');
