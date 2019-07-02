import tileSrc from '../../src/assets/tile.png';

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
    grass: { layer: layer.floor, id: 0 },
    grassAlt: { layer: layer.floor, id: 1 },
    grassAlt2: { layer: layer.floor, id: 2 },
    dirtyGrass: { layer: layer.floor, id: 3 },
    greenFlower: { layer: layer.floor, id: 4 },
    redFlower: { layer: layer.floor, id: 5 },
    woodPlank: { layer: layer.floor, id: 6 },
    brick: { layer: layer.floor, id: 7 },
    waterTopRightCorner: { layer: layer.obstacle, ids: [8, 24, 40, 56, 8] },
    waterRight: { layer: layer.obstacle, ids: [9, 25, 41, 57, 9] },
    waterTopLeftCorner: { layer: layer.obstacle, ids: [10, 26, 42, 58, 10] },
    waterLeft: { layer: layer.obstacle, ids: [11, 27, 43, 59, 11] },
    waterTopRightDot: { layer: layer.obstacle, ids: [12, 28, 44, 60, 12] },
    waterTop: { layer: layer.obstacle, ids: [13, 29, 45, 61, 13] },
    waterTopLeftDot: { layer: layer.obstacle, ids: [14, 30, 46, 62, 14] },
    water: { layer: layer.obstacle, ids: [15, 31, 47, 63, 15] },
    waterBottomRightDot: { layer: layer.obstacle, ids: [16, 32, 48, 64, 16] },
    waterBottom: { layer: layer.obstacle, ids: [17, 33, 49, 65, 17] },
    waterBottomLeftDot: { layer: layer.obstacle, ids: [18, 34, 50, 66, 18] },
    waterBottomLeftCorner: { layer: layer.obstacle, ids: [19, 35, 51, 67, 19] },
    waterBottomRightCorner: {
      layer: layer.obstacle,
      ids: [20, 36, 52, 68, 20],
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
