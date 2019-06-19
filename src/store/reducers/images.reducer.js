export const SetPlayerImage = 'SET_PLAYER_IMAGE';
export const SetAltPlayerImage = 'SET_ALT_PLAYER_IMAGE';
export const SetBackgroundImage = 'SET_BACKGROUND_IMAGE';

// TODO: Add alt player image

const imagesState = {
  player: null,
  altPlayer: null,
  background: null,
};

export function imagesReducer(state = imagesState, { type, payload }) {
  switch (type) {
    case SetPlayerImage:
      return { ...state, player: payload };
    case SetBackgroundImage:
      return { ...state, background: payload };
    case SetAltPlayerImage:
      return { ...state, altPlayer: payload };
    default:
      return state;
  }
}
