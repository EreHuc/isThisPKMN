import { getContextForeground, getImagesBackground } from '../../store';
import { backgroundTile } from '../../variables';
import { canDraw } from './map.utils';
import { drawTile } from '../canvas';

export function drawForeground(
  animatedTiles = [],
  idleTiles = [],
  tileAnimationIndex,
) {
  const foregroundContext = getContextForeground();
  const backgroundImg = getImagesBackground();

  animatedTiles.forEach(animatedTile => {
    if (canDraw(animatedTile.xDest, animatedTile.yDest)) {
      const tileId = animatedTile.ids[tileAnimationIndex];

      drawTile({
        tile: backgroundTile,
        tileImg: backgroundImg,
        tileId,
        context: foregroundContext,
        xDest: animatedTile.xDest,
        yDest: animatedTile.yDest,
      });
    }
  });

  idleTiles.forEach(idleTile => {
    if (canDraw(idleTile.xDest, idleTile.yDest)) {
      drawTile({
        tile: backgroundTile,
        tileImg: backgroundImg,
        tileId: idleTile.id,
        context: foregroundContext,
        xDest: idleTile.xDest,
        yDest: idleTile.yDest,
      });
    }
  });
}
