export const SetForegroundContext = 'SET_FOREGROUND_CONTEXT';
export const SetBackgroundContext = 'SET_BACKGROUND_CONTEXT';
export const SetPlayerContext = 'SET_PLAYER_CONTEXT';

const contextState = {
  player: null,
  foreground: null,
  background: null,
};

export function contextsReducer(state = contextState, { type, payload }) {
  switch (type) {
    case SetForegroundContext:
      return { ...state, foreground: payload };
    case SetPlayerContext:
      return { ...state, player: payload };
    case SetBackgroundContext:
      return { ...state, background: payload };
    default:
      return state;
  }
}
