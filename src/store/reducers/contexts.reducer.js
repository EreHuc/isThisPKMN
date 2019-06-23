export const SetBackgroundContext = 'SET_BACKGROUND_CONTEXT';
export const SetPlayerContext = 'SET_PLAYER_CONTEXT';

const contextState = {
  player: null,
  background: null,
};

export function contextsReducer(state = contextState, { type, payload }) {
  switch (type) {
    case SetBackgroundContext:
      return { ...state, background: payload };
    case SetPlayerContext:
      return { ...state, player: payload };
    default:
      return state;
  }
}
