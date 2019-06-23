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

export const setAltPlayerImage = altPlayerImage => ({
  type: SetAltPlayerImage,
  payload: altPlayerImage,
});
