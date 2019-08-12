import { layer as defaultLayer } from '../../../../src/variables';
import { getId, paddedNumber } from '../../scripts/utils';

export const InitCanvas = 'INIT_CANVAS';
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
  movePoints: {},
};

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
    case InitCanvas: {
      const {
        background = createMap(null, 36, 36),
        foreground = createMap(null, 36, 36),
        collision = createMap(defaultLayer.floor, 36, 36),
        movePoints = {},
        playerPositions = { x: null, y: null },
      } = payload;

      return {
        ...state,
        background,
        foreground,
        collision,
        movePoints,
        playerPositions,
      };
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

function handleAddMovePoint(movePoints, { x, y, ...payload }) {
  const id = `${paddedNumber(x)}:${paddedNumber(y)}`;
  return {
    ...movePoints,
    [id]: payload,
  };
}

function handleRemoveMovePoint(movePoints, payload) {
  const id = getId(payload.x, payload.y);

  // eslint-disable-next-line no-unused-vars
  const { [id]: _, ...filteredMovePoints } = movePoints;

  return { ...filteredMovePoints };
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
