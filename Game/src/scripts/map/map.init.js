import { backgroundTile } from '../../variables';

/**
 * Split foreground list in 2 list: animated tiles and non animated tiles
 * Made to easily handle special behavior on animated tiles
 * @param foreground
 * @returns {Array[]}
 */
export function init(foreground) {
  let idleTiles = [];
  let animatedTiles = [];

  for (let y = 0; y < foreground.length; y++) {
    for (let x = 0; x < foreground[y].length; x++) {
      const { id, ids } = foreground[y][x] || { id: 700 };
      const xDest = x * backgroundTile.width;
      const yDest = y * backgroundTile.height;

      if (id === undefined) {
        animatedTiles = [...animatedTiles, { ids, xDest, yDest }];
      } else {
        idleTiles = [...idleTiles, { id, xDest, yDest }];
      }
    }
  }

  return [animatedTiles, idleTiles];
}
