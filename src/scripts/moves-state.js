import { keyCodes, playerTile } from '../variables';
import {
  setPlayerPosition,
  setPlayerTileId,
} from '../store/actions/player.actions';
import { store } from '../store';
import { canMove, shouldTeleport, teleport } from './moves';
import { setStatusLoading } from '../store/actions/map.actions';

function _moveAnimation({ moveTiles = [], store }) {
  return () => {
    const {
      player: { tileId: playerTileId },
    } = store.getState();

    const currentTileIndex = moveTiles.findIndex(
      tileId => tileId === playerTileId,
    );
    const tileId =
      currentTileIndex === moveTiles.length - 1
        ? moveTiles[0]
        : moveTiles[currentTileIndex + 1];

    store.dispatch(setPlayerTileId(tileId));
  };
}

function _move({ x = 0, y = 0, store, canMove }) {
  return () => {
    const {
      player: { positions, moveDirection },
    } = store.getState();

    const playerX = positions.x + x;
    const playerY = positions.y + y;

    if (canMove(playerX, playerY, moveDirection)) {
      store.dispatch(
        setPlayerPosition({
          y: playerY,
          x: playerX,
        }),
      );
    } else if (!teleport(playerX, playerY, moveDirection)) {
      store.dispatch(setStatusLoading());
    }
  };
}

function _idle({ idleTile, store }) {
  return () => {
    store.dispatch(setPlayerTileId(idleTile));
  };
}

const moveAnimationUp = _moveAnimation({
  moveTiles: [playerTile.move.up, playerTile.move.upAlt],
  store,
});
const moveAnimationDown = _moveAnimation({
  moveTiles: [playerTile.move.down, playerTile.move.downAlt],
  store,
});
const moveAnimationLeft = _moveAnimation({
  moveTiles: [playerTile.idle.left, playerTile.move.left],
  store,
});
const moveAnimationRight = _moveAnimation({
  moveTiles: [playerTile.idle.right, playerTile.move.right],
  store,
});

const moveUp = _move({
  y: -playerTile.pxPerFrameMovement,
  store,
  canMove: canMove,
});
const moveDown = _move({
  y: playerTile.pxPerFrameMovement,
  store,
  canMove: canMove,
});
const moveLeft = _move({
  x: -playerTile.pxPerFrameMovement,
  store,
  canMove: canMove,
});
const moveRight = _move({
  x: playerTile.pxPerFrameMovement,
  store,
  canMove: canMove,
});

const idleUp = _idle({ store, idleTile: playerTile.idle.up });
const idleDown = _idle({ store, idleTile: playerTile.idle.down });
const idleLeft = _idle({ store, idleTile: playerTile.idle.left });
const idleRight = _idle({ store, idleTile: playerTile.idle.right });

export const moveAnimations = {
  [keyCodes.right]: moveAnimationRight,
  [keyCodes.left]: moveAnimationLeft,
  [keyCodes.up]: moveAnimationUp,
  [keyCodes.down]: moveAnimationDown,
};

export const movesState = {
  [keyCodes.right]: moveRight,
  [keyCodes.left]: moveLeft,
  [keyCodes.up]: moveUp,
  [keyCodes.down]: moveDown,
};

export const idles = {
  [keyCodes.up]: idleUp,
  [keyCodes.down]: idleDown,
  [keyCodes.left]: idleLeft,
  [keyCodes.right]: idleRight,
};
