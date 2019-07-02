import {
  SetBackgroundMap,
  SetForegroundMap,
  SetSelectedCanvas,
  SetSelectedElement,
} from '../reducers/canvas.reducer';

export const setBackgroundMap = (x, y, element) => ({
  type: SetBackgroundMap,
  payload: {
    x,
    y,
    element,
  },
});

export const setForegroundMap = (x, y, element) => ({
  type: SetForegroundMap,
  payload: {
    x,
    y,
    element,
  },
});

export const setSelectedElement = selectedElement => ({
  type: SetSelectedElement,
  payload: selectedElement,
});

export const setSelectedCanvas = selectedCanvas => ({
  type: SetSelectedCanvas,
  payload: selectedCanvas,
});
