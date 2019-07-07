import { SetMapAnimatedWater, SetScale } from '../reducers/map.reducer';

export const setMapAnimatedWater = isAnimatedWater => ({
  type: SetMapAnimatedWater,
  payload: isAnimatedWater,
});

export const setScale = scale => ({
  type: SetScale,
  payload: scale,
});
