export const SetMap = 'SET_MAP';
export const SetSelectedElement = 'SET_SELECTED_ELEMENT';

const mapState = {
  map: [
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
  ],
  selectedElement: null,
};

export function canvasReducer(state = mapState, { type, payload }) {
  switch (type) {
    case SetSelectedElement: {
      return { ...state, selectedElement: payload };
    }
    case SetMap: {
      return handleSideEffect(state, payload);
    }
    default:
      return state;
  }
}

function handleSideEffect(state, { x, y, element }) {
  const { map } = state;
  map[y][x] = element;

  return { ...state, map };
}
