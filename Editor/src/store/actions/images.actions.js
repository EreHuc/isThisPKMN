import { SetBackgroundImage } from '../reducers/images.reducer';

export const setBackgroundImage = backgroundImage => ({
  type: SetBackgroundImage,
  payload: backgroundImage,
});
