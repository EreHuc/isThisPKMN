import {
  SetBackgroundMap,
  SetForegroundMap,
  SetLayerMap,
  SetMaps,
  SetPlayerPositions,
  SetSelectedCanvas,
  SetSelectedElement,
  SetSelectedElementPositions,
  SetEraseMap,
  SetMovePoint,
  RemoveMovePoint,
} from '../reducers/canvas.reducer';
import { layer } from '../../variables';

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

export const setEraseMap = (x, y, canvas) => ({
  type: SetEraseMap,
  payload: {
    x,
    y,
    canvas,
    element: canvas.includes('layer') ? layer.floor : null,
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

export const SetStartMovePoint = (x, y, id) => ({
  type: SetMovePoint,
  payload: {
    start: {
      x,
      y,
    },
    id,
  },
});

export const setEndMovePoint = (x, y, id) => ({
  type: SetMovePoint,
  payload: {
    end: {
      x,
      y,
    },
    id,
  },
});

export const removeMovePoint = id => ({
  type: RemoveMovePoint,
  payload: {
    id,
  },
});
