import { clearTile, drawTile } from './canvas';
import { keyCodes, playerTile } from '../variables';
import { store } from '../store';
import {
  setPlayerDirection,
  setPlayerMovement,
} from '../store/actions/player.actions';
import localState from './local-state';
import { keyHandler } from './key-handler';
import { idles, moves } from './moves';

const keydownCallback = store => keyCode => {
  let canMove = false;
  switch (keyCode) {
    case keyCodes.up:
      // moveUp();
      store.dispatch(setPlayerDirection(keyCodes.up));
      canMove = true;
      break;
    case keyCodes.down:
      // moveDown();
      store.dispatch(setPlayerDirection(keyCodes.down));
      canMove = true;
      break;
    case keyCodes.right:
      // moveRight();
      store.dispatch(setPlayerDirection(keyCodes.right));
      canMove = true;
      break;
    case keyCodes.left:
      // moveLeft();
      store.dispatch(setPlayerDirection(keyCodes.left));
      canMove = true;
      break;
    default:
      // eslint-disable-next-line no-console
      console.log('NOT HANDLED');
  }

  canMove && store.dispatch(setPlayerMovement(true));
};

const keyupCallback = store => keyCode => {
  let canStop = false;
  switch (keyCode) {
    case keyCodes.up:
      canStop = true;
      break;
    case keyCodes.down:
      canStop = true;
      break;
    case keyCodes.right:
      canStop = true;
      break;
    case keyCodes.left:
      canStop = true;
      break;
    default:
      // eslint-disable-next-line no-console
      console.log('NOT HANDLED');
  }

  canStop && store.dispatch(setPlayerMovement(false));
};

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

function _playerAnimationFrame(
  store,
  localState,
  keyHandler,
  moves,
  idles,
  drawPlayer,
  keyupCallback,
  keydownCallback,
  destroyMovementHandler,
) {
  const state = localState();

  const step = timestamp => {
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
      drawPlayer();

      lastMovingState !== isMoving &&
        state.setLocalState({
          isMoving,
        });
    }

    const rafId = window.requestAnimationFrame(step);
    state.setLocalState({ rafId });
  };

  const stop = () => {
    const { rafId } = state.getLocalState();
    window.cancelAnimationFrame(rafId);
    destroyMovementHandler(store, keyupCallback, keydownCallback);
  };

  const start = () => {
    drawPlayer();
    const rafId = window.requestAnimationFrame(step);

    state.setLocalState({ rafId });

    keyHandler({
      onKeyUp: keyupCallback(store),
      onKeyDown: keydownCallback(store),
    });
  };

  return {
    start,
    stop,
  };
}

function _destroyMovementHandler(store, keyupCallback, keydownCallback) {
  window.removeEventListener('keydown', keydownCallback(store));
  window.removeEventListener('keyup', keyupCallback(store));
}

export const drawPlayer = _drawPlayer(drawTile, clearTile, localState, store);

export const playerAnimation = _playerAnimationFrame(
  store,
  localState,
  keyHandler,
  moves,
  idles,
  drawPlayer,
  keyupCallback,
  keydownCallback,
  _destroyMovementHandler,
);
