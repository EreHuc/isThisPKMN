import { canvas } from '../../variables';

export const SetBackgroundMap = 'SET_BACKGROUND_MAP';
export const SetForegroundMap = 'SET_FOREGROUND_MAP';
export const SetCollisionMap = 'SET_COLLISION_MAP';
export const SetTilePerRowMap = 'SET_TILE_PER_ROW_MAP';
export const SetTilePerColumnMap = 'SET_TILE_PER_COLUMN_MAP';
export const SetMapAnimatedWater = 'SET_MAP_ANIMATED_WATER';
export const SetScale = 'SET_SCALE';

const mapState = {
  animateWaterTile: true,
  scale: canvas.scale,
  background: null,
  foreground: null,
  collision: null,
  tilePerRow: 0,
  tilePerColumn: 0,
};

export function mapReducer(state = mapState, { type, payload }) {
  switch (type) {
    case SetMapAnimatedWater:
      return { ...state, animateWaterTile: payload };
    case SetScale:
      return { ...state, scale: payload };
    case SetBackgroundMap:
      return { ...state, background: payload };
    case SetForegroundMap:
      return { ...state, foreground: payload };
    case SetTilePerRowMap:
      return { ...state, tilePerRow: payload };
    case SetTilePerColumnMap:
      return { ...state, tilePerColumn: payload };
    case SetCollisionMap:
      return { ...state, collision: payload };
    default:
      return state;
  }
}
