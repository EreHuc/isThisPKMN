import { keyCodes, layer } from '../../variables';
import { getMapCollision } from '../../store';
import { movementCheck, positionToTile } from './movement.check';

function wallCoordinateToLookup(x, y, direction) {
  const x1 = positionToTile(x + 1);
  const x2 = positionToTile(x + 14);
  const y1 = positionToTile(y + 5);
  const y2 = positionToTile(y + 15);

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
}

/**
 * Return false on obstacle in coordinates
 * @param coordinates [[x, y], [x, y]]
 * @returns {boolean}
 */
function shouldBlockOnWall(coordinates) {
  const collision = getMapCollision();

  const shouldStop = (x, y) =>
    !collision ||
    !collision[y] ||
    collision[y][x] === undefined ||
    collision[y][x] === layer.obstacle;

  return coordinates.reduce((acc, [x, y]) => {
    if (shouldStop(x, y)) {
      return true;
    }
    return acc;
  }, false);
}

export const wall = movementCheck(wallCoordinateToLookup, shouldBlockOnWall);
