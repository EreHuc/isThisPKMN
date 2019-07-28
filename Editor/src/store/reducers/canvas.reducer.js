import { layer as defaultLayer } from '../../../../src/variables';

export const SetMaps = 'SET_MAP';
export const SetBackgroundMap = 'SET_BACKGROUND_MAP';
export const SetForegroundMap = 'SET_FOREGROUND_MAP';
export const SetSelectedElement = 'SET_SELECTED_ELEMENT';
export const SetSelectedElementPositions = 'SET_SELECTED_ELEMENT_POSITIONS';
export const SetSelectedCanvas = 'SET_SELECTED_CANVAS';
export const SetPlayerPositions = 'SET_PLAYER_POSITIONS';
export const SetCollisionMap = 'SET_COLLISION_MAP';
export const SetEraseMap = 'SET_ERASE_MAP';
export const SetMovePoint = 'SET_MOVE_POINT';
export const RemoveMovePoint = 'REMOVE_MOVE_POINT';

const createMap = (baseElement, width, height) => {
  return JSON.parse(
    JSON.stringify(Array(height).fill([...Array(width).fill(baseElement)])),
  );
};

const mapState = {
  background: createMap(null, 36, 36),
  foreground: createMap(null, 36, 36),
  size: {
    width: 36,
    height: 36,
  },
  playerPositions: {
    x: null,
    y: null,
  },
  collision: createMap(defaultLayer.floor, 36, 36),
  selectedElement: null,
  selectedElementPositions: null,
  selectedCanvas: 'background',
  movePoints: [],
};

// movePoint = { id: string: start: { x: number, y: number }, end: { x: number, y: number } } }

export function canvasReducer(state = mapState, { type, payload }) {
  switch (type) {
    case SetSelectedElement: {
      return { ...state, selectedElement: payload };
    }
    case SetBackgroundMap: {
      return handleSideEffectBackground(state, payload);
    }
    case SetForegroundMap: {
      return handleSideEffectForeground(state, payload);
    }
    case SetCollisionMap: {
      return handleSideEffectCollision(state, payload);
    }
    case SetEraseMap: {
      return handleSideEffect(payload.canvas)(state, payload);
    }
    case SetMaps: {
      let { background, foreground, collision } = payload;

      background = background || createMap(null, 36, 36);
      foreground = foreground || createMap(null, 36, 36);
      collision = collision || createMap(defaultLayer.floor, 36, 36);

      return { ...state, background, foreground, collision };
    }
    case SetSelectedCanvas: {
      return { ...state, selectedCanvas: payload };
    }
    case SetPlayerPositions: {
      return { ...state, playerPositions: payload };
    }
    case SetSelectedElementPositions: {
      return { ...state, selectedElementPositions: payload };
    }
    case SetMovePoint: {
      return {
        ...state,
        movePoints: handleAddMovePoint(state.movePoints, payload),
      };
    }
    case RemoveMovePoint: {
      return {
        ...state,
        movePoints: handleRemoveMovePoint(state.movePoints, payload),
      };
    }
    default:
      return state;
  }
}

function handleAddMovePoint(movePoints, payload) {
  if (movePoints.filter(({ id }) => id === payload.id).length) {
    return movePoints.map(movePoint =>
      movePoint.id === payload.id ? { ...movePoint, ...payload } : movePoint,
    );
  }
  return [...movePoints, payload];
}

function handleRemoveMovePoint(movePoints, payload) {
  return movePoints.filter(movePoint => movePoint.id !== payload.id);
}

function handleSideEffect(mapName) {
  return (state, { x, y, element }) => {
    const map = state[mapName];
    map[y][x] = element;

    return { ...state, [mapName]: map };
  };
}

const handleSideEffectForeground = handleSideEffect('foreground');
const handleSideEffectBackground = handleSideEffect('background');
const handleSideEffectCollision = handleSideEffect('collision');
