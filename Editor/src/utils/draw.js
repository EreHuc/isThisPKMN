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
        maps: { background: backgroundMap, foreground: foregroundMap },
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

    backgroundMap.forEach((map, y) => {
      map.forEach((element, x) => {
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

    foregroundMap.forEach((map, y) => {
      map.forEach((element, x) => {
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

export function drawGrid(context, canvasDetail) {
  for (let y = 0; y < canvasDetail.height / 32; y++) {
    context.beginPath();
    context.moveTo(0, y * 32);
    context.lineTo(canvasDetail.width, y * 32);
    context.stroke();
  }
  for (let x = 0; x < canvasDetail.width / 32; x++) {
    context.beginPath();
    context.moveTo(x * 32, 0);
    context.lineTo(x * 32, canvasDetail.height);
    context.stroke();
  }
}

export const drawElementList = _drawElementList(drawTile);

export const drawMap = _drawMap(store, drawTile, clearTile);
