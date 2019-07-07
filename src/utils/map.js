import { backgroundTile, canvas } from '../variables';
import { store } from '../store';
import { drawTile } from './canvas';
import { background } from '../maps';

const _foregroundStep = () => {
  let start = 0;

  return (timestamp, state) => {
    const {
      animatedTiles,
      animationDirection = 1,
      tileIndex = 0,
    } = state.getLocalState();

    if (animatedTiles && timestamp - start > 300) {
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

const _drawForeground = (store, drawTile, canDraw) => state => {
  const {
    animatedTiles = [],
    idleTiles = [],
    tileIndex,
  } = state.getLocalState();

  const {
    contexts: { foreground: foregroundContext },
    images: { background: backgroundImg },
  } = store.getState();

  animatedTiles.forEach(animatedTile => {
    const tileId = animatedTile.ids[tileIndex];
    if (canDraw(animatedTile.xDest, animatedTile.yDest)) {
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

  drawBackground(store, background.tileList, canDraw);
};

const initDrawForeground = (map, state) => {
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

const _canDraw = store => (x, y) => {
  const {
    player: {
      positions: { x: xPlayer, y: yPlayer },
    },
  } = store.getState();

  const deltaY = canvas.height / 2;
  const deltaX = canvas.width / 2;
  const isX = Math.abs(xPlayer - x) <= deltaX + 16;
  const isY = Math.abs(yPlayer - y) <= deltaY + 16;
  return isX && isY;
};

const canDraw = _canDraw(store);

const drawForeground = _drawForeground(store, drawTile, canDraw);

const foregroundStep = _foregroundStep();

export const drawBackground = (store, background, canDraw) => {
  const {
    contexts: { background: backgroundContext },
    images: { background: backgroundImg },
  } = store.getState();

  background.forEach((tiles, y) => {
    tiles.forEach((tile, x) => {
      const xDest = x * backgroundTile.width;
      const yDest = y * backgroundTile.height;

      if (tile && canDraw(xDest, yDest)) {
        drawTile({
          tile: backgroundTile,
          tileImg: backgroundImg,
          tileId: tile.id === undefined ? tile.ids[0] || 0 : tile.id || 0,
          context: backgroundContext,
          xDest: xDest,
          yDest: yDest,
        });
      }
    });
  });
};

export { drawForeground, initDrawForeground, foregroundStep };
