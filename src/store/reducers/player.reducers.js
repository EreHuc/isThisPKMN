export const SetMovement = 'SET_MOVEMENT';
export const SetSprite = 'SET_SPRITE';
export const SetDirection = 'SET_DIRECTION';
export const SetFilters = 'SET_FILTERS';

export const PlayerState = {
  isMoving: false,
  src: null,
  direction: 0,
};

export function playerReducer(state = PlayerState, { type, payload }) {
  switch (type) {
    case SetMovement:
      return { ...state, isMoving: payload };
    case SetSprite:
      return { ...state, src: payload };
    case SetDirection:
      return { ...state, direction: payload };
    case SetFilters:
      return { ...state, filters: payload };
    default:
      return state;
  }
}
