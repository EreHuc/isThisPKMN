import { clearTile, drawTile } from './canvas';
import { playerTile } from '../variables';
import { store } from '../store';
import localState from './local-state';
import { idles, moveAnimations, movesState } from './moves-state';

function _drawPlayer(drawTile, clearTile, localState, store) {
  const state = localState();

  return () => {
    const {
      player: {
        image: tileImg,
        positions: { x, y },
        tileId,
      },
      contexts: { player: context },
    } = store.getState();

    drawTile({
      tile: playerTile,
      tileImg,
      tileId,
      context,
      xDest: x,
      yDest: y,
    });

    state.setLocalState({
      x,
      y,
    });
  };
}

function _playerStep(store, localState, moves, moveAnimations, idles) {
  const state = localState();

  return timestamp => {
    const {
      player: { isMoving, moveDirection },
    } = store.getState();

    const {
      start = 0,
      isMoving: lastMovingState,
      moveDirection: lastMoveDirection,
      hitStun = 0,
    } = state.getLocalState();

    if (timestamp - start > 200 || moveDirection !== lastMoveDirection) {
      if (isMoving && hitStun > 2) {
        moveAnimations[moveDirection]();
      }

      state.setLocalState({
        start: timestamp,
      });
    }

    if (isMoving) {
      state.setLocalState({
        hitStun: hitStun + 1,
      });

      if (hitStun > 2 || moveDirection === lastMoveDirection) {
        moves[moveDirection]();

        state.setLocalState({
          moveDirection,
        });
      }
    } else if (lastMovingState !== isMoving) {
      idles[moveDirection]();

      state.setLocalState({
        moveDirection,
        hitStun: 0,
      });
    }

    lastMovingState !== isMoving &&
      state.setLocalState({
        isMoving,
      });
  };
}

export const drawPlayer = _drawPlayer(drawTile, clearTile, localState, store);

export const playerStep = _playerStep(
  store,
  localState,
  movesState,
  moveAnimations,
  idles,
);
