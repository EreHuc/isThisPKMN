import { backgroundTile } from '../../variables';

export const SetMaps = 'SET_MAP';
export const SetBackgroundMap = 'SET_BACKGROUND_MAP';
export const SetForegroundMap = 'SET_FOREGROUND_MAP';
export const SetSelectedElement = 'SET_SELECTED_ELEMENT';
export const SetSelectedCanvas = 'SET_SELECTED_CANVAS';

const createMap = (baseElement, width, height) => {
  return Array(height).fill([...Array(width).fill(baseElement)]);
};

const mapState = {
  maps: {
    background: createMap(null, 36, 18),
    foreground: createMap(backgroundTile.list.empty, 36, 18),
  },
  selectedElement: null,
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

      background = background || createMap(null, 36, 18);
      foreground = foreground || createMap(backgroundTile.list.empty, 36, 18);

      return { ...state, maps: { background, foreground } };
    }
    case SetSelectedCanvas: {
      return { ...state, selectedCanvas: payload };
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
