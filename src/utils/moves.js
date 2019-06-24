import { keyCodes, layer, playerTile } from '../variables';
import map from '../maps';
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

function wall(x, y) {
  // Define player hit box.
  // Hit box smaller than player because of error in block detection
  // Hit box size : top : -4 px higher; bottom: -1px lower; left & right : -1px wider;
  // Top as an higher value because of realism ( head can go through obstacle )
  const x1 = Math.floor((x + 1) / playerTile.width);
  const x2 = Math.floor((x + 15) / playerTile.width);
  const y1 = Math.floor((y + 4) / playerTile.height);
  const y2 = Math.floor((y + 15) / playerTile.height);

  return [[x1, y1], [x1, y2], [x2, y1], [x2, y2]].reduce(
    (acc, [tileX, tileY]) => {
      if (
        !map.tileList[tileY] ||
        !map.tileList[tileY][tileX] ||
        map.tileList[tileY][tileX].layer === layer.obstacle
      ) {
        return false;
      }
      return acc;
    },
    true,
  );
}

function _move({ moveTiles = [], x = 0, y = 0, store, canMove }) {
  return () => {
    const {
      player: { positions, tileId: playerTileId },
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

function _idle({ idleTile, store }) {
  return () => {
    store.dispatch(setPlayerTileId(idleTile));
  };
}

const canMove = _canMove(wall);

const moveUp = _move({
  moveTiles: [playerTile.move.up, playerTile.move.upAlt],
  y: -4,
  store,
  canMove: canMove,
});
const moveDown = _move({
  moveTiles: [playerTile.move.down, playerTile.move.downAlt],
  y: 4,
  store,
  canMove: canMove,
});
const moveLeft = _move({
  moveTiles: [playerTile.idle.left, playerTile.move.left],
  x: -4,
  store,
  canMove: canMove,
});
const moveRight = _move({
  moveTiles: [playerTile.idle.right, playerTile.move.right],
  x: 4,
  store,
  canMove: canMove,
});

const idleUp = _idle({ store, idleTile: playerTile.idle.up });
const idleDown = _idle({ store, idleTile: playerTile.idle.down });
const idleLeft = _idle({ store, idleTile: playerTile.idle.left });
const idleRight = _idle({ store, idleTile: playerTile.idle.right });

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
