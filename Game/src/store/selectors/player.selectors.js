import { createSelector } from './index';

export const getPlayerIsMoving = createSelector(state => state.player.isMoving);

export const getPlayerImage = createSelector(state => state.player.image);

export const getPlayerMoveDirection = createSelector(
  state => state.player.moveDirection,
);

export const getPlayerPositions = createSelector(
  state => state.player.positions,
);

export const getPlayerTileId = createSelector(state => state.player.tileId);
