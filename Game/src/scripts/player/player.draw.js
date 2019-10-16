import { playerTile } from '../../variables';
import { drawTile } from '../canvas';
import {
  getContextPlayer,
  getPlayerImage,
  getPlayerPositions,
  getPlayerTileId,
} from '../../store';

/**
 * Method that draw player on player canvas
 */

export function drawPlayer() {
  const tileImg = getPlayerImage();
  const { x, y } = getPlayerPositions();
  const tileId = getPlayerTileId();
  const context = getContextPlayer();

  drawTile({
    tile: playerTile,
    tileImg,
    tileId,
    context,
    xDest: x,
    yDest: y,
  });
}
