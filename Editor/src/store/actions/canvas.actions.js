import {
  SetBackgroundMap,
  SetForegroundMap,
  SetLayerMap,
  SetMaps,
  SetPlayerPositions,
  SetSelectedCanvas,
  SetSelectedElement,
  SetSelectedElementPositions,
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

export const setMaps = ({ background, foreground, layer }) => ({
  type: SetMaps,
  payload: { background, foreground, layer },
});

export const setSelectedElement = selectedElement => ({
  type: SetSelectedElement,
  payload: selectedElement,
});

export const setSelectedElementPositions = (x, y) => ({
  type: SetSelectedElementPositions,
  payload: {
    x,
    y,
  },
});

export const setSelectedCanvas = selectedCanvas => ({
  type: SetSelectedCanvas,
  payload: selectedCanvas,
});

export const setPlayerPositions = (x, y) => ({
  type: SetPlayerPositions,
  payload: {
    x,
    y,
  },
});

export const setLayerMap = (x, y, element) => ({
  type: SetLayerMap,
  payload: {
    x,
    y,
    element,
  },
});
