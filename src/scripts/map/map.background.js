import { canDraw } from './map.utils';
import { drawTile } from '../canvas';
import {
  getContextBackground,
  getImagesBackground,
  getMapBackground,
} from '../../store';
import { backgroundTile } from '../../variables';

export function drawBackground() {
  const backgroundContext = getContextBackground();
  const backgroundImg = getImagesBackground();
  const background = getMapBackground();

  background.forEach((row, y) => {
    row.forEach((tile, x) => {
      const xDest = x * backgroundTile.width;
      const yDest = y * backgroundTile.height;

      if (tile && canDraw(xDest, yDest)) {
        const tileId = (tile.id === undefined ? tile.ids[0] : tile.id) || 0;

        drawTile({
          tile: backgroundTile,
          tileImg: backgroundImg,
          tileId,
          context: backgroundContext,
          xDest,
          yDest,
        });
      }
    });
  });
}
