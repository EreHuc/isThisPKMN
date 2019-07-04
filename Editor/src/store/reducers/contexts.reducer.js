export const SetBackgroundContext = 'SET_BACKGROUND_CONTEXT';
export const SetBackgroundGridContext = 'SET_BACKGROUND_GRID_CONTEXT';
export const SetForegroundContext = 'SET_FOREGROUND_CONTEXT';
export const SetElementsContext = 'SET_ELEMENTS_CONTEXT';
export const SetElementsGridContext = 'SET_ELEMENTS_GRID_CONTEXT';

const contextState = {
  elements: null,
  background: null,
  foreground: null,
  backgroundGrid: null,
  elementsGrid: null,
};

export function contextsReducer(state = contextState, { type, payload }) {
  switch (type) {
    case SetBackgroundContext:
      return { ...state, background: payload };
    case SetBackgroundGridContext:
      return { ...state, backgroundGrid: payload };
    case SetForegroundContext:
      return { ...state, foreground: payload };
    case SetElementsContext:
      return { ...state, elements: payload };
    case SetElementsGridContext:
      return { ...state, backgroundGrid: payload };
    default:
      return state;
  }
}
