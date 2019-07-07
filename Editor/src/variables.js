import tileSrc from '../../src/assets/tiles.png';
import { backgroundTile as originalBackgroundTile } from '../../src/variables';

export const layer = {
  floor: 0,
  player: 1,
  obstacle: 2,
};

export const backgroundTile = {
  height: 16,
  width: 16,
  src: tileSrc,
  tilePerRow: 8,
  list: {
    ...originalBackgroundTile.list,
    start: {
      id: 78,
    },
    erase: {
      id: 86,
    },
    empty: {
      id: 79,
    },
    invisibleWall: { layer: layer.obstacle, id: 87 },
  },
};

export const backgroundCanvas = {
  height: 1152,
  width: 1152,
  scale: 2,
};

export const elementCanvas = {
  height: 1152,
  width: 8 * 16 * 2,
  scale: 2,
  elementPerRow: 8,
};
