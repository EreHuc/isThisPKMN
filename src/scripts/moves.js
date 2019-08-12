import { keyCodes, layer, playerTile } from '../variables';
import { store } from '../store';

const positionToTile = x => Math.floor(x / playerTile.width);

function _canMove(wall, teleport) {
  return (x, y, direction) => {
    return wall(x, y, direction) && teleport(x, y, direction);
  };
}

function checkMovement(coordinateToLookup, shouldMove) {
  return (x, y, direction) => shouldMove(coordinateToLookup(x, y, direction));
}

export const teleportCoordinateToLookup = (x, y) => {
  const coordX = x + playerTile.width / 2;
  const coordY = y + playerTile.height - 3;

  return [positionToTile(coordX), positionToTile(coordY)];
};

const wallCoordinateToLookup = (x, y, direction) => {
  const x1 = positionToTile(x + 2);
  const x2 = positionToTile(x + 14);
  const y1 = positionToTile(y + 5);
  const y2 = positionToTile(y + 14);

  switch (direction) {
    case keyCodes.up:
      return [[x1, y1], [x2, y1]];
    case keyCodes.down:
      return [[x1, y2], [x2, y2]];
    case keyCodes.right:
      return [[x2, y1], [x2, y2]];
    case keyCodes.left:
      return [[x1, y1], [x1, y2]];
  }
};

const shouldTeleport = ([x, y]) => {
  const {
    map: { collision },
  } = store.getState();

  return !(collision[y][x] === layer.tpIn);
};

const shouldBlockOnWall = coordinates => {
  const {
    map: { collision },
  } = store.getState();

  const shouldStop = (x, y) =>
    !collision ||
    !collision[y] ||
    collision[y][x] === undefined ||
    collision[y][x] === layer.obstacle;

  return coordinates.reduce((acc, [x, y]) => {
    if (shouldStop(x, y)) {
      return false;
    }
    return acc;
  }, true);
};

export const teleport = checkMovement(
  teleportCoordinateToLookup,
  shouldTeleport,
);

const wall = checkMovement(wallCoordinateToLookup, shouldBlockOnWall);

export const canMove = _canMove(wall, teleport);
