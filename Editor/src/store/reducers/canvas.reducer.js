import { backgroundTile } from '../../variables';

export const SetMaps = 'SET_MAP';
export const SetBackgroundMap = 'SET_BACKGROUND_MAP';
export const SetForegroundMap = 'SET_FOREGROUND_MAP';
export const SetSelectedElement = 'SET_SELECTED_ELEMENT';
export const SetSelectedElementPositions = 'SET_SELECTED_ELEMENT_POSITIONS';
export const SetSelectedCanvas = 'SET_SELECTED_CANVAS';
export const SetPlayerPositions = 'SET_PLAYER_POSITIONS';

const createMap = (baseElement, width, height) => {
  return JSON.parse(
    JSON.stringify(Array(height).fill([...Array(width).fill(baseElement)])),
  );
};

const mapState = {
  maps: {
    background: createMap(null, 36, 36),
    foreground: createMap(backgroundTile.list.empty, 36, 36),
  },
  size: {
    width: 36,
    height: 36,
  },
  playerPositions: {
    x: null,
    y: null,
  },
  selectedElement: null,
  selectedElementPositions: null,
  selectedCanvas: 'background',
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
    case SetMaps: {
      let { background, foreground } = payload;

      background = background || createMap(null, 36, 36);
      foreground = foreground || createMap(backgroundTile.list.empty, 36, 36);

      return { ...state, maps: { background, foreground } };
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
    default:
      return state;
  }
}

function handleSideEffect(mapName) {
  return (state, { x, y, element }) => {
    const { maps } = state;
    maps[mapName][y][x] = element;

    return { ...state, maps };
  };
}

const handleSideEffectForeground = handleSideEffect('foreground');
const handleSideEffectBackground = handleSideEffect('background');
