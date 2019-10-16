import {
  SetAltPlayerImage,
  SetBackgroundImage,
  SetPlayerImage,
} from '../reducers/images.reducer';

export const setPlayerImage = playerImage => ({
  type: SetPlayerImage,
  payload: playerImage,
});

export const setBackgroundImage = backgroundImage => ({
  type: SetBackgroundImage,
  payload: backgroundImage,
});

export const setAltPlayerImage = (altPlayerName, altPlayerImage) => ({
  type: SetAltPlayerImage,
  payload: {
    name: altPlayerName,
    image: altPlayerImage,
  },
});
