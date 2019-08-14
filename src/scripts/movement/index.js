import wall from './movement.wall';
import teleport from './movement.teleport';

/**
 * Check if player can move depending on wall and teleport block
 * @param wall
 * @param teleport
 * @returns {function(*=, *=, *=): *}
 */
function _canMove(wall, teleport) {
  return (x, y, direction) =>
    wall(x, y, direction) && teleport(x, y, direction);
}

export const canMove = _canMove(wall, teleport);
