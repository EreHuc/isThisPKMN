import { createSelector } from './index';

export const getMapStatus = createSelector(state => state.map.status);

export const getMapIsAnimated = createSelector(state => state.map.isAnimated);

export const getMapScale = createSelector(state => state.map.scale);

export const getMapBackground = createSelector(state => state.map.background);

export const getMapForeground = createSelector(state => state.map.foreground);

export const getMapCollision = createSelector(state => state.map.collision);

export const getMapTilePerRow = createSelector(state => state.map.tilePerRow);

export const getMapTilePerColumn = createSelector(
  state => state.map.tilePerColumn,
);

export const getMapMovePoints = createSelector(state => state.map.movePoints);

export const getMapCurrentMovePoint = createSelector(
  state => state.map.currentMovePoint,
);
