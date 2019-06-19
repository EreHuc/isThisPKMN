import {
  SetPlayerDirection,
  SetPlayerMovement,
  SetPlayerCurrentImage,
  SetPlayerFilters,
  SetPlayerPosition,
  SetPlayerTileId,
} from '../reducers/player.reducer';

export const setPlayerMovement = canMove => ({
  type: SetPlayerMovement,
  payload: canMove,
});

export const setPlayerCurrentImage = spriteSrc => ({
  type: SetPlayerCurrentImage,
  payload: spriteSrc,
});

export const setPlayerDirection = direction => ({
  type: SetPlayerDirection,
  payload: direction,
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
