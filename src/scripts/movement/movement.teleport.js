import { layer, playerTile } from '../../variables';
import { getMapCollision, getMapMovePoints } from '../../store';
import { movementCheck, positionToTile } from './movement.check';
import { getId } from '../../../Editor/src/scripts/utils';

function teleportCoordinateToLookup(x, y) {
  const coordX = x + playerTile.width / 2;
  const coordY = y + playerTile.height - 3;

  return [positionToTile(coordX), positionToTile(coordY)];
}

/**
 * Return false on teleport block in coordinate
 * @param coordinate [x, y]
 * @returns {boolean}
 */
function shouldTeleport([x, y]) {
  const collision = getMapCollision();
  const movePoints = getMapMovePoints();

  return collision[y][x] === layer.tpIn ? movePoints[getId(x, y)] : false;
}

export const teleport = movementCheck(
  teleportCoordinateToLookup,
  shouldTeleport,
);
