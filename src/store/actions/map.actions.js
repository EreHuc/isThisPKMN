import {
  SetMapAnimatedWater,
  SetScale,
  SetBackgroundMap,
  SetForegroundMap,
  SetTilePerRowMap,
  SetTilePerColumnMap,
  SetCollisionMap,
  SetMap,
} from '../reducers/map.reducer';

export const setMapAnimatedWater = isAnimatedWater => ({
  type: SetMapAnimatedWater,
  payload: isAnimatedWater,
});

export const setScale = scale => ({
  type: SetScale,
  payload: scale,
});

export const setBackgroundMap = backgroundMap => ({
  type: SetBackgroundMap,
  payload: backgroundMap,
});

export const setForegroundMap = foregroundMap => ({
  type: SetForegroundMap,
  payload: foregroundMap,
});

export const setCollisionMap = collisionMap => ({
  type: SetCollisionMap,
  payload: collisionMap,
});

export const setTilePerRow = tilePerRow => ({
  type: SetTilePerRowMap,
  payload: tilePerRow,
});

export const setTilePerColumn = tilePerColumn => ({
  type: SetTilePerColumnMap,
  payload: tilePerColumn,
});

export const setMap = map => ({
  type: SetMap,
  payload: map,
});
