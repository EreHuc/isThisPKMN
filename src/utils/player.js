import { drawTile } from './canvas';
import { keyCodes, playerTile } from '../variables';
import { store } from '../store';
import {
  setPlayerDirection,
  setPlayerMovement,
  setPlayerPosition,
  setPlayerTileId,
} from '../store/actions/player.actions';
import localState from './local-state';

const clearTile = ({ context, x, y, w, h }) => context.clearRect(x, y, w, h);

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

function _playerMovement(store, localState) {
  const state = localState();

  const step = timestamp => {
    const {
      positions: prevPositions = {},
      tileId: prevTileId = {},
      start,
    } = state.getLocalState();

    const {
      player: { positions = {}, tileId },
    } = store.getState();

    if (
      (prevPositions.x !== positions.x ||
        prevPositions.y !== positions.y ||
        prevTileId !== tileId) &&
      timestamp - (start || 0) > 75
    ) {
      drawPlayer();

      state.setLocalState({
        positions,
        tileId,
        start: timestamp,
      });

      store.dispatch(setPlayerMovement(true));
    }

    const rafId = window.requestAnimationFrame(step);
    state.setLocalState({ rafId });
  };

  const stop = () => {
    const { rafId } = state.getLocalState();
    window.cancelAnimationFrame(rafId);
    _destroyMovementHandler(store);
  };

  const start = () => {
    const rafId = window.requestAnimationFrame(step);

    state.setLocalState({ rafId });
    _movementHandler(store);
  };

  return {
    start,
    stop,
  };
}

const keydownCallback = store => ({ code }) => {
  const {
    player: { canMove },
  } = store.getState();

  if (canMove) {
    switch (code) {
      case keyCodes.up:
        moveUp();
        break;
      case keyCodes.down:
        moveDown();
        break;
      case keyCodes.right:
        moveRight();
        break;
      case keyCodes.left:
        moveLeft();
        break;
      default:
        // eslint-disable-next-line no-console
        console.log('NOT HANDLED');
    }
  }
};

const keyupCallback = store => ({ code }) => {
  switch (code) {
    case keyCodes.up:
      store.dispatch(setPlayerTileId(playerTile.idle.up));
      break;
    case keyCodes.down:
      store.dispatch(setPlayerTileId(playerTile.idle.down));
      break;
    case keyCodes.right:
      store.dispatch(setPlayerTileId(playerTile.idle.right));
      break;
    case keyCodes.left:
      store.dispatch(setPlayerTileId(playerTile.idle.left));
      break;
    default:
      // eslint-disable-next-line no-console
      console.log('NOT HANDLED');
  }
};

// should only handle tileId + isMoving
function _movementHandler(store) {
  window.addEventListener('keydown', keydownCallback(store));
  window.addEventListener('keyup', keyupCallback(store));
}

function _destroyMovementHandler(store) {
  window.removeEventListener('keydown', keydownCallback(store));
  window.removeEventListener('keyup', keydownCallback(store));
}

const _move = ({
  idleTile,
  moveTiles = [],
  x = 0,
  y = 0,
  moveDirection,
  store,
  localState,
}) => {
  return () => {
    const state = localState();
    const {
      player: { positions, tileId, direction },
    } = store.getState();
    const isMultipleMoveTiles = moveTiles.length > 1;

    if (direction === moveDirection) {
      store.dispatch(
        setPlayerPosition({
          y: positions.y + y,
          x: positions.x + x,
        }),
      );

      if (isMultipleMoveTiles) {
        if (tileId === idleTile) {
          state.setLocalState({ tileId: moveTiles[0] });
        } else {
          const currentTileIndex = moveTiles.findIndex(
            element => element === tileId,
          );
          state.setLocalState({
            tileId:
              currentTileIndex === moveTiles.length - 1
                ? moveTiles[0]
                : moveTiles[currentTileIndex + 1],
          });
        }
      } else {
        state.setLocalState({
          tileId: idleTile === tileId ? moveTiles[0] : idleTile,
        });
      }
    } else {
      state.setLocalState({
        tileId: idleTile,
      });

      store.dispatch(setPlayerDirection(moveDirection));
    }

    store.dispatch(setPlayerTileId(state.getLocalState().tileId));
    store.dispatch(setPlayerMovement(false));
  };
};

export const moveUp = _move({
  idleTile: playerTile.idle.up,
  moveTiles: [playerTile.move.up, playerTile.move.upAlt],
  y: -4,
  moveDirection: playerTile.direction.up,
  store,
  localState,
});

export const moveDown = _move({
  idleTile: playerTile.idle.down,
  moveTiles: [playerTile.move.down, playerTile.move.downAlt],
  y: 4,
  moveDirection: playerTile.direction.down,
  store,
  localState,
});

export const moveLeft = _move({
  idleTile: playerTile.idle.left,
  moveTiles: [playerTile.move.left],
  x: -4,
  moveDirection: playerTile.direction.left,
  store,
  localState,
});

export const moveRight = _move({
  idleTile: playerTile.idle.right,
  moveTiles: [playerTile.move.right],
  x: 4,
  moveDirection: playerTile.direction.right,
  store,
  localState,
});

export const playerMovement = _playerMovement(store, localState);

export const drawPlayer = _drawPlayer(drawTile, clearTile, localState, store);
