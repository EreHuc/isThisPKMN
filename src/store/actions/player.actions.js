import {
  SetPlayerDirection,
  SetPlayerMovement,
  SetPlayerCurrentImage,
  SetPlayerFilters,
  SetPlayerPosition,
  SetPlayerTileId,
} from '../reducers/player.reducer';

export const setPlayerMovement = isMoving => ({
  type: SetPlayerMovement,
  payload: isMoving,
});

export const setPlayerCurrentImage = spriteSrc => ({
  type: SetPlayerCurrentImage,
  payload: spriteSrc,
});

export const setPlayerDirection = moveDirection => ({
  type: SetPlayerDirection,
  payload: moveDirection,
});

export const setPlayerFilters = filters => ({
  type: SetPlayerFilters,
  payload: filters,
});

export const setPlayerPosition = positions => ({
  type: SetPlayerPosition,
  payload: positions,
});

export const setPlayerTileId = tileId => ({
  type: SetPlayerTileId,
  payload: tileId,
});
