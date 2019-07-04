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
      id: 15,
    },
    erase: {
      id: 23,
    },
    empty: {
      id: 31,
    },
  },
};

export const backgroundCanvas = {
  height: 576,
  width: 1152,
  scale: 2,
};

export const elementCanvas = {
  height: 576,
  width: 224,
  scale: 2,
  elementPerRow: 7,
};
