import { backgroundTile } from './constant';
import { drawTile } from './canvas.constructor';

const _drawMap = drawTile => (map, context, tileImg) => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      drawTile({
        tile: backgroundTile,
        tileImg,
        tileId: map[y][x].id,
        context,
        xDest: x * backgroundTile.width,
        yDest: y * backgroundTile.height,
      });
    }
  }
};

export const drawMap = _drawMap(drawTile);
