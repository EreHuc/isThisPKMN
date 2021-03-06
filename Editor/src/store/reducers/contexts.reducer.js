export const SetBackgroundContext = 'SET_BACKGROUND_CONTEXT';
export const SetBackgroundGridContext = 'SET_BACKGROUND_GRID_CONTEXT';
export const SetForegroundContext = 'SET_FOREGROUND_CONTEXT';
export const SetElementsContext = 'SET_ELEMENTS_CONTEXT';
export const SetElementsGridContext = 'SET_ELEMENTS_GRID_CONTEXT';
export const SetElementsSelectorContext = 'SET_ELEMENTS_SELECTOR_CONTEXT';
export const SetCollisionContext = 'SET_COLLISION_CONTEXT';

const contextState = {
  elements: null,
  background: null,
  foreground: null,
  backgroundGrid: null,
  elementsGrid: null,
  elementsSelector: null,
  collision: null,
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
      return { ...state, elementsGrid: payload };
    case SetElementsSelectorContext:
      return { ...state, elementsSelector: payload };
    case SetCollisionContext:
      return { ...state, collision: payload };
    default:
      return state;
  }
}
