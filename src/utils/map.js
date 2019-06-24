import { backgroundTile } from '../variables';
import { store } from '../store';
import { drawTile } from './canvas';

const _backgroundStep = () => {
  let start = 0;

  return (timestamp, state) => {
    const {
      animatedTiles,
      animationDirection = 1,
      tileIndex = 0,
    } = state.getLocalState();

    if (timestamp - start > 300) {
      let animatedTilesIndex;
      switch (animationDirection) {
        case 1:
          if (tileIndex === animatedTiles[0].ids.length - 1) {
            animatedTilesIndex = tileIndex;
            state.setLocalState({
              animationDirection: -animationDirection,
            });
          } else {
            animatedTilesIndex = tileIndex + animationDirection;
          }
          break;
        case -1:
          if (tileIndex === 0) {
            animatedTilesIndex = tileIndex;
            state.setLocalState({
              animationDirection: -animationDirection,
            });
          } else {
            animatedTilesIndex = tileIndex + animationDirection;
          }
          break;
      }

      state.setLocalState({
        tileIndex: animatedTilesIndex,
      });

      start = timestamp;
    }
  };
};

const _drawBackground = (store, drawTile) => state => {
  const {
    animatedTiles = [],
    idleTiles = [],
    tileIndex,
  } = state.getLocalState();

  const {
    contexts: { background: backgroundContext },
    images: { background: backgroundImg },
  } = store.getState();

  animatedTiles.forEach(animatedTile => {
    const tileId = animatedTile.ids[tileIndex];

    drawTile({
      tile: backgroundTile,
      tileImg: backgroundImg,
      tileId,
      context: backgroundContext,
      xDest: animatedTile.xDest,
      yDest: animatedTile.yDest,
    });
  });

  idleTiles.forEach(idleTile => {
    drawTile({
      tile: backgroundTile,
      tileImg: backgroundImg,
      tileId: idleTile.id,
      context: backgroundContext,
      xDest: idleTile.xDest,
      yDest: idleTile.yDest,
    });
  });
};

const initDrawBackground = (map, state) => {
  for (let y = 0; y < map.tileList.length; y++) {
    for (let x = 0; x < map.tileList[y].length; x++) {
      const { id, ids } = map.tileList[y][x];
      const { idleTiles = [], animatedTiles = [] } = state.getLocalState();
      const xDest = x * backgroundTile.width;
      const yDest = y * backgroundTile.height;

      if (id === undefined) {
        state.setLocalState({
          animatedTiles: [...animatedTiles, { ids, xDest, yDest }],
        });
      } else {
        state.setLocalState({
          idleTiles: [...idleTiles, { id, xDest, yDest }],
        });
      }
    }
  }
};

const drawBackground = _drawBackground(store, drawTile);

const backgroundStep = _backgroundStep();

export { drawBackground, initDrawBackground, backgroundStep };
