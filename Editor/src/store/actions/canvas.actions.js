import {
  SetBackgroundMap,
  SetForegroundMap,
  SetCollisionMap,
  InitCanvas,
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
    element: canvas.includes('collision') ? layer.floor : null,
  },
});

export const initCanvas = ({
  background,
  foreground,
  collision,
  movePoints,
  playerPositions,
}) => ({
  type: InitCanvas,
  payload: { background, foreground, collision, movePoints, playerPositions },
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

export const setCollisionMap = (x, y, element) => ({
  type: SetCollisionMap,
  payload: {
    x,
    y,
    element,
  },
});

const setMovePoint = type => (x, y, id, mapName) => ({
  type: SetMovePoint,
  payload: {
    x,
    y,
    id,
    type,
    mapName,
  },
});

export const setMoveIn = setMovePoint('in');
export const setMoveOut = setMovePoint('out');

export const removeMovePoint = (x, y) => ({
  type: RemoveMovePoint,
  payload: {
    x,
    y,
  },
});
