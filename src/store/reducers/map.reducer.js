import { canvas } from '../../variables';

export const SetMapAnimatedWater = 'SET_MAP_ANIMATED_WATER';
export const SetScale = 'SET_SCALE';

const mapState = {
  animateWaterTile: true,
  scale: canvas.scale,
};

export function mapReducer(state = mapState, { type, payload }) {
  switch (type) {
    case SetMapAnimatedWater:
      return { ...state, animateWaterTile: payload };
    case SetScale:
      return { ...state, scale: payload };
    default:
      return state;
  }
}
