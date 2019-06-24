import { clearTile, drawTile } from './canvas';
import { playerTile } from '../variables';
import { store } from '../store';
import localState from './local-state';
import { keyHandler } from './key-handler';
import { idles, moves } from './moves';

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
    const { x: prevX = 0, y: prevY = 0 } = state.getLocalState();

    // Add -1 and +2 to increase clear radius and destroy shadow-effect
    clearTile({
      context,
      x: prevX - 1,
      y: prevY - 1,
      w: playerTile.width + 2,
      h: playerTile.height + 2,
    });

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

function _playerStep(store, localState, keyHandler, moves, idles) {
  const state = localState();

  return timestamp => {
    let canDrawPlayer = false;
    const {
      player: { isMoving, moveDirection },
    } = store.getState();

    const {
      start = 0,
      isMoving: lastMovingState,
      moveDirection: lastMoveDirection,
      hitStun = 0,
    } = state.getLocalState();

    if (timestamp - start > 100) {
      if (isMoving && (hitStun > 1 || moveDirection === lastMoveDirection)) {
        moves[moveDirection]();

        canDrawPlayer = true;

        state.setLocalState({
          moveDirection,
        });
      }

      state.setLocalState({
        start: timestamp,
      });
    }

    if (isMoving) {
      state.setLocalState({
        hitStun: hitStun + 1,
      });

      if (hitStun === 0) {
        canDrawPlayer = true;
      }
    } else {
      if (lastMovingState !== isMoving) {
        idles[moveDirection]();

        state.setLocalState({
          moveDirection,
        });

        canDrawPlayer = true;

        state.setLocalState({
          hitStun: 0,
        });
      }
    }

    if (canDrawPlayer) {
      lastMovingState !== isMoving &&
        state.setLocalState({
          isMoving,
        });
    }
  };
}

export const drawPlayer = _drawPlayer(drawTile, clearTile, localState, store);

export const playerStep = _playerStep(
  store,
  localState,
  keyHandler,
  moves,
  idles,
);
