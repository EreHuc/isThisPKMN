import { backgroundTile } from '../variables';
import { drawTile } from './canvas';

const _drawMap = drawTile => ({ map, context, backgroundImg }) => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      drawTile({
        tile: backgroundTile,
        tileImg: backgroundImg,
        tileId: map[y][x].id,
        context,
        xDest: x * backgroundTile.width,
        yDest: y * backgroundTile.height,
      });
    }
  }
};

export const drawMap = _drawMap(drawTile);
