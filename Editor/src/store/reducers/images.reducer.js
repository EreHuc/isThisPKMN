export const SetBackgroundImage = 'SET_BACKGROUND_IMAGE';

const imagesState = {
  background: null,
};

export function imagesReducer(state = imagesState, { type, payload }) {
  switch (type) {
    case SetBackgroundImage:
      return { ...state, background: payload };
    default:
      return state;
  }
}
