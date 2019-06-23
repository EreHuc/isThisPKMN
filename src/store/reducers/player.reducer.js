import { keyCodes } from '../../variables';

export const SetPlayerMovement = 'SET_PLAYER_MOVEMENT';
export const SetPlayerCurrentImage = 'SET_PLAYER_CURRENT_IMAGE';
export const SetPlayerDirection = 'SET_PLAYER_DIRECTION';
export const SetPlayerFilters = 'SET_PLAYER_FILTERS';
export const SetPlayerPosition = 'SET_PLAYER_POSITION';
export const SetPlayerTileId = 'SET_PLAYER_TILE_ID';

export const PlayerState = {
  isMoving: false,
  image: null,
  moveDirection: keyCodes.down,
  positions: {
    x: 0,
    y: 0,
  },
  tileId: 0,
};

export function playerReducer(state = PlayerState, { type, payload }) {
  switch (type) {
    case SetPlayerMovement:
      return { ...state, isMoving: payload };
    case SetPlayerCurrentImage:
      return { ...state, image: payload };
    case SetPlayerDirection:
      return { ...state, moveDirection: payload };
    case SetPlayerFilters:
      return { ...state, filters: payload };
    case SetPlayerPosition:
      return { ...state, positions: payload };
    case SetPlayerTileId:
      return { ...state, tileId: payload };
    default:
      return state;
  }
}
