import { backgroundTile } from '../../variables';

export const SetMaps = 'SET_MAP';
export const SetBackgroundMap = 'SET_BACKGROUND_MAP';
export const SetForegroundMap = 'SET_FOREGROUND_MAP';
export const SetSelectedElement = 'SET_SELECTED_ELEMENT';
export const SetSelectedElementPositions = 'SET_SELECTED_ELEMENT_POSITIONS';
export const SetSelectedCanvas = 'SET_SELECTED_CANVAS';
export const SetPlayerPositions = 'SET_PLAYER_POSITIONS';
export const SetLayerMap = 'SET_LAYER_MAP';

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
  layer: createMap(backgroundTile.list.empty.layer, 36, 36),
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
    case SetLayerMap: {
      return handleSideEffectLayer(state, payload);
    }
    case SetMaps: {
      let { background, foreground, layer } = payload;

      background = background || createMap(null, 36, 36);
      foreground = foreground || createMap(null, 36, 36);
      layer = layer || createMap(backgroundTile.list.empty.layer, 36, 36);

      return { ...state, background, foreground, layer };
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
    const map = state[mapName];
    map[y][x] = element;

    return { ...state, [mapName]: map };
  };
}

const handleSideEffectForeground = handleSideEffect('foreground');
const handleSideEffectBackground = handleSideEffect('background');
const handleSideEffectLayer = handleSideEffect('layer');
