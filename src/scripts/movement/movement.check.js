import { playerTile } from '../../variables';

/**
 * Transform canvas position to tile index
 * @param position
 * @returns {number}
 */
export function positionToTile(position) {
  return Math.floor(position / playerTile.width);
}

/**
 * Generic method for checking if player can move given coordinate and should move method
 * @param coordinateToLookup
 * @param shouldMove
 * @returns {function(*=, *=, *=): *}
 */
export function movementCheck(coordinateToLookup, shouldMove) {
  return (x, y, direction) => shouldMove(coordinateToLookup(x, y, direction));
}
