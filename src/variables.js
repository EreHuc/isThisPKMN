import tileSrc from './assets/tiles.png';
import playerSrc from './assets/sacha.png';
import pikachuSrc from './assets/pikachu.png';
import pkmnSrc from './assets/pkmn.png';
import melofeeSrc from './assets/melofee.png';
import jessieSrc from './assets/jessie.png';
import jamesSrc from './assets/james.png';

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
    waterBottom: { layer: layer.obstacle, ids: [8, 24, 40, 56, 8] },
    waterLeft: { layer: layer.obstacle, ids: [9, 25, 41, 57, 9] },
    waterTopLeftCorner: { layer: layer.obstacle, ids: [10, 26, 42, 58, 10] },
    waterTopRightCorner: { layer: layer.obstacle, ids: [11, 27, 43, 59, 11] },
    waterBottomRightDot: { layer: layer.obstacle, ids: [12, 28, 44, 60, 12] },
    waterBottomLeftDot: { layer: layer.obstacle, ids: [13, 29, 45, 61, 13] },
    water: { layer: layer.obstacle, ids: [14, 30, 46, 62, 14] },
    waterRight: { layer: layer.obstacle, ids: [16, 32, 48, 64, 16] },
    waterTop: { layer: layer.obstacle, ids: [17, 33, 49, 65, 17] },
    waterBottomLeftCorner: { layer: layer.obstacle, ids: [18, 34, 50, 66, 18] },
    waterBottomRightCorner: {
      layer: layer.obstacle,
      ids: [19, 35, 51, 67, 19],
    },
    waterTopRightDot: {
      layer: layer.obstacle,
      ids: [20, 36, 52, 68, 20],
    },
    waterTopLeftDot: { layer: layer.obstacle, ids: [21, 37, 53, 69, 21] },
    whiteGround: { layer: layer.obstacle, id: 70 },
    roofEndLeft: { layer: layer.obstacle, id: 72 },
    roofEnd: { layer: layer.obstacle, id: 73 },
    roofEndRight: { layer: layer.obstacle, id: 74 },
    roofStartEnd: { layer: layer.obstacle, id: 75 },
    roof: { layer: layer.obstacle, id: 76 },
    roofStartEndLeft: { layer: layer.obstacle, id: 77 },
    roofStartLeft: { layer: layer.obstacle, id: 80 },
    roofStart: { layer: layer.obstacle, id: 81 },
    roofStartRight: { layer: layer.obstacle, id: 82 },
    door: { layer: layer.obstacle, id: 83 },
    roofLeft: { layer: layer.obstacle, id: 84 },
    roofStartEndRight: { layer: layer.floor, id: 85 },
    roofedWallLeftEnd: { layer: layer.obstacle, id: 88 },
    wallSimple: { layer: layer.obstacle, id: 89 },
    roofedWallRightEnd: { layer: layer.obstacle, id: 90 },
    wallStriped: { layer: layer.obstacle, id: 91 },
    roofRight: { layer: layer.obstacle, id: 92 },
    wallStripedRightEnd: { layer: layer.obstacle, id: 93 },
    wallStripedDoubleWindow: { layer: layer.obstacle, id: 96 },
    wallSimpleRightWindow: { layer: layer.obstacle, id: 97 },
    wallSimpleLeftWindow: { layer: layer.obstacle, id: 98 },
    wallStripedLeftWindow: { layer: layer.obstacle, id: 99 },
    wallStripedRightWindow: { layer: layer.obstacle, id: 100 },
    wallStripedLeftEnd: { layer: layer.obstacle, id: 101 },
    roofedFloorLeftEnd: { layer: layer.obstacle, id: 104 },
    floorLeftWindow: { layer: layer.obstacle, id: 105 },
    floorRightWindow: { layer: layer.obstacle, id: 106 },
    floorDoubleWindow: { layer: layer.obstacle, id: 107 },
    floor: { layer: layer.obstacle, id: 108 },
    roofedFloorRightEnd: { layer: layer.obstacle, id: 109 },
  },
};

export const canvas = {
  width: 216,
  height: 240,
  scale: 2,
};

export const playerTile = {
  height: 16,
  width: 16,
  src: playerSrc,
  pikachuSrc,
  pkmnSrc,
  melofeeSrc,
  jessieSrc,
  jamesSrc,
  layer: layer.player,
  pxPerFrameMovement: 1,
  idle: {
    up: 3,
    right: 6,
    down: 0,
    left: 9,
  },
  move: {
    down: 1,
    downAlt: 2,
    up: 4,
    upAlt: 5,
    right: 7,
    left: 10,
  },
  tilePerRow: 3,
  direction: {
    up: 0,
    down: 1,
    left: 2,
    right: 3,
  },
};

export const keyCodes = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  right: 'ArrowRight',
  left: 'ArrowLeft',
};
