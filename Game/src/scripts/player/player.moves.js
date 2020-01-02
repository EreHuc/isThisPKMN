import { teleport, wall } from '../movement';
import { keyCodes, playerTile } from '../../variables';
import store, {
  getPlayerMoveDirection,
  getPlayerPositions,
  getPlayerTileId,
  setPlayerMovement,
  setPlayerPosition,
  setPlayerTileId,
} from '../../store';
import { setCurrentMovePoint, setStatusLoading } from '../../store/actions';

function _moveAnimation({ moveTiles = [] }) {
  return () => {
    const playerTileId = getPlayerTileId();

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

function _movePlayerPosition({ x = 0, y = 0 }) {
  return () => {
    const positions = getPlayerPositions();
    const moveDirection = getPlayerMoveDirection();
    const playerX = positions.x + x;
    const playerY = positions.y + y;
    const isWall = wall(playerX, playerY, moveDirection);
    const teleportPoint = teleport(playerX, playerY, moveDirection);

    if (teleportPoint) {
      store.dispatch(setCurrentMovePoint(teleportPoint));
      store.dispatch(setStatusLoading());
      store.dispatch(setPlayerMovement(false));
      return;
    }

    if (!isWall) {
      store.dispatch(
        setPlayerPosition({
          y: playerY,
          x: playerX,
        }),
      );
    }
  };
}

function _idleAnimation({ idleTile }) {
  return () => {
    store.dispatch(setPlayerTileId(idleTile));
  };
}

const moveAnimationUp = _moveAnimation({
  moveTiles: [playerTile.move.up, playerTile.move.upAlt],
});
const moveAnimationDown = _moveAnimation({
  moveTiles: [playerTile.move.down, playerTile.move.downAlt],
});
const moveAnimationLeft = _moveAnimation({
  moveTiles: [playerTile.idle.left, playerTile.move.left],
});
const moveAnimationRight = _moveAnimation({
  moveTiles: [playerTile.idle.right, playerTile.move.right],
});

const moveUp = _movePlayerPosition({
  y: -playerTile.pxPerFrameMovement,
});
const moveDown = _movePlayerPosition({
  y: playerTile.pxPerFrameMovement,
});
const moveLeft = _movePlayerPosition({
  x: -playerTile.pxPerFrameMovement,
});
const moveRight = _movePlayerPosition({
  x: playerTile.pxPerFrameMovement,
});

const idleUp = _idleAnimation({ idleTile: playerTile.idle.up });
const idleDown = _idleAnimation({ idleTile: playerTile.idle.down });
const idleLeft = _idleAnimation({ idleTile: playerTile.idle.left });
const idleRight = _idleAnimation({ idleTile: playerTile.idle.right });

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
export const idlesAnimation = {
  [keyCodes.up]: idleUp,
  [keyCodes.down]: idleDown,
  [keyCodes.left]: idleLeft,
  [keyCodes.right]: idleRight,
};
