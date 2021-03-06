import { getPlayerPositions } from '../../store';
import { backgroundTile, canvas } from '../../variables';

export function canDraw(x, y) {
  const { x: xPlayer, y: yPlayer } = getPlayerPositions();

  const deltaY = canvas.height / 2;
  const deltaX = canvas.width / 2;
  const isX = Math.abs(xPlayer - x) <= deltaX + 16;
  const isY = Math.abs(yPlayer - y) <= deltaY + 16;

  return isX && isY;
}

export function tileToPosition(x, y, deltaX, deltaY) {
  return {
    x: Math.floor(x * backgroundTile.width) + deltaX,
    y: Math.floor(y * backgroundTile.height) + deltaY,
  };
}
