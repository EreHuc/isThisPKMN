export const SetMapAnimatedWater = 'SET_MAP_ANIMATED_WATER';

const mapState = {
  animateWaterTile: true,
};

export function mapReducer(state = mapState, { type, payload }) {
  switch (type) {
    case SetMapAnimatedWater:
      return { ...state, animateWaterTile: payload };
    default:
      return state;
  }
}
