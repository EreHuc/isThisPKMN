// import { SetMap } from '../reducers/canvas.reducer';
import { SetMap, SetSelectedElement } from '../reducers/canvas.reducer';

export const setMap = (x, y, element) => ({
  type: SetMap,
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
