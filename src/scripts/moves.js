import { keyCodes, layer, playerTile } from '../variables';
import {
  setPlayerPosition,
  setPlayerTileId,
} from '../store/actions/player.actions';
import { store } from '../store';

function _canMove(wall) {
  return (x, y) => {
    return wall(x, y) && true;
  };
}

function _wall(store) {
  return (x, y) => {
    const {
      map: { collision },
    } = store.getState();
    // Define player hit box.
    // Hit box smaller than player because of error in block detection
    // Hit box size : top : -5 px higher; bottom: -2px lower; left & right : -2px wider;
    // Top as an higher value because of realism ( head can go through obstacle )
    const x1 = Math.floor((x + 2) / playerTile.width);
    const x2 = Math.floor((x + 14) / playerTile.width);
    const y1 = Math.floor((y + 5) / playerTile.height);
    const y2 = Math.floor((y + 14) / playerTile.height);

    return [[x1, y1], [x1, y2], [x2, y1], [x2, y2]].reduce(
      (acc, [tileX, tileY]) => {
        if (
          !collision ||
          !collision[tileY] ||
          collision[tileY][tileX] === undefined ||
          collision[tileY][tileX] === layer.obstacle
        ) {
          return false;
        }
        return acc;
      },
      true,
    );
  };
}

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
      player: { positions },
    } = store.getState();

    const playerX = positions.x + x;
    const playerY = positions.y + y;

    if (canMove(playerX, playerY)) {
      store.dispatch(
        setPlayerPosition({
          y: playerY,
          x: playerX,
        }),
      );
    }
  };
}

function _idle({ idleTile, store }) {
  return () => {
    store.dispatch(setPlayerTileId(idleTile));
  };
}

const wall = _wall(store);

const canMove = _canMove(wall);

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

export const moves = {
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
