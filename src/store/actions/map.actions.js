import { SetMapAnimatedWater } from '../reducers/map.reducer';

export const setMapAnimatedWater = isAnimatedWater => ({
  type: SetMapAnimatedWater,
  payload: isAnimatedWater,
});
