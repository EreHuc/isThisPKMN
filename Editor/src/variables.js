import tileSrc from '../../Game/src/assets/tiles.png';
import {
  backgroundTile as originalBackgroundTile,
  layer as originalLayer,
} from '../../Game/src/variables';

export const layer = {
  ...originalLayer,
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
    portalIn: {
      id: 79,
      layer: layer.tpIn,
    },
    portalOut: { id: 87, layer: layer.tpOut },
    changeMap: { id: 135 },
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
