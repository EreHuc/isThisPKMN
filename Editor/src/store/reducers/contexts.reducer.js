export const SetBackgroundContext = 'SET_BACKGROUND_CONTEXT';
export const SetForegroundContext = 'SET_FOREGROUND_CONTEXT';
export const SetElementsContext = 'SET_ELEMENT_CONTEXT';

const contextState = {
  elements: null,
  background: null,
  foreground: null,
};

export function contextsReducer(state = contextState, { type, payload }) {
  switch (type) {
    case SetBackgroundContext:
      return { ...state, background: payload };
    case SetForegroundContext:
      return { ...state, foreground: payload };
    case SetElementsContext:
      return { ...state, elements: payload };
    default:
      return state;
  }
}
