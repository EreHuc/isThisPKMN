import { clearTile, drawTile } from '../../../src/utils/canvas';
import { backgroundCanvas, backgroundTile } from '../variables';
import { store } from '../store';

function _drawElementList(drawTile) {
  return (elementContext, backgroundImg, maxPerRow = 7) => {
    Object.values(backgroundTile.list).forEach(({ id, ids }, index) => {
      const xDest = (index % maxPerRow) * 16;
      const yDest = Math.floor(index / maxPerRow) * 16;
      drawTile({
        tile: backgroundTile,
        tileImg: backgroundImg,
        tileId: id === undefined ? ids[0] : id,
        context: elementContext,
        xDest,
        yDest,
      });
    });
  };
}

function _drawMap(store, drawTile, clearTile) {
  return () => {
    const {
      canvas: {
        map: { background: backgroundMap, foreground: foregroundMap },
      },
      images: { background },
      contexts: {
        background: backgroundContext,
        foreground: foregroundContext,
      },
    } = store.getState();

    [backgroundContext, foregroundContext].forEach(context => {
      clearTile({
        context,
        y: 0,
        x: 0,
        w: backgroundCanvas.width,
        h: backgroundCanvas.height,
      });
    });

    backgroundMap.forEach((subMap, y) => {
      subMap.forEach((element, x) => {
        if (element) {
          drawTile({
            tile: backgroundTile,
            tileImg: background,
            tileId: element.id === undefined ? element.ids[0] : element.id,
            context: backgroundContext,
            xDest: x * backgroundTile.width,
            yDest: y * backgroundTile.height,
          });
        }
      });
    });

    foregroundMap.forEach((subMap, y) => {
      subMap.forEach((element, x) => {
        if (element) {
          drawTile({
            tile: backgroundTile,
            tileImg: background,
            tileId: element.id === undefined ? element.ids[0] : element.id,
            context: foregroundContext,
            xDest: x * backgroundTile.width,
            yDest: y * backgroundTile.height,
          });
        }
      });
    });
  };
}

export const drawElementList = _drawElementList(drawTile);

export const drawMap = _drawMap(store, drawTile, clearTile);
