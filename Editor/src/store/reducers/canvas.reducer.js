export const SetBackgroundMap = 'SET_BACKGROUND_MAP';
export const SetForegroundMap = 'SET_FOREGROUND_MAP';
export const SetSelectedElement = 'SET_SELECTED_ELEMENT';
export const SetSelectedCanvas = 'SET_SELECTED_CANVAS';

const map = [
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
];

const map2 = [
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
  [...Array(36).fill(null)],
];

const mapState = {
  map: {
    background: map,
    foreground: map2,
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
    case SetSelectedCanvas: {
      return { ...state, selectedCanvas: payload };
    }
    default:
      return state;
  }
}

function handleSideEffect(mapName) {
  return (state, { x, y, element }) => {
    const { map } = state;
    map[mapName][y][x] = element;

    return { ...state, map };
  };
}

const handleSideEffectForeground = handleSideEffect('foreground');
const handleSideEffectBackground = handleSideEffect('background');
