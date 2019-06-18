import {
  SetDirection,
  SetMovement,
  SetSprite,
  SetFilters,
} from '../reducers/player.reducers';

export const setMovement = isMoving => ({
  type: SetMovement,
  payload: isMoving,
});

export const setSpriteSrc = spriteSrc => ({
  type: SetSprite,
  payload: spriteSrc,
});

export const setDirection = direction => ({
  type: SetDirection,
  payload: direction,
});

export const setFilters = filters => ({
  type: SetFilters,
  payload: filters,
});
