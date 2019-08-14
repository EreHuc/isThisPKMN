import { moveAnimations, idlesAnimation, movesState } from './player.moves';
import { getPlayerIsMoving, getPlayerMoveDirection } from '../../store';

function _playerStep() {
  let start = 0;
  let lastMovingState;
  let lastMoveDirection;

  return timestamp => {
    const isMoving = getPlayerIsMoving();
    const moveDirection = getPlayerMoveDirection();

    // move every 200 ms or when direction change
    if (timestamp - start > 200 || moveDirection !== lastMoveDirection) {
      // if player is already in movement more than 2 frame then update move animation
      if (isMoving) {
        moveAnimations[moveDirection]();
      }

      start = timestamp;
    }

    // if player is moving
    if (isMoving && moveDirection === lastMoveDirection) {
      movesState[moveDirection]();

      lastMoveDirection = moveDirection;

      // else if player is stop then put it in idle animation
    } else if (lastMovingState !== isMoving) {
      idlesAnimation[moveDirection]();

      lastMoveDirection = moveDirection;
    }

    // if moving state change, save the moving state
    lastMovingState = isMoving;
    lastMoveDirection = moveDirection;
  };
}

export const playerStep = _playerStep();
