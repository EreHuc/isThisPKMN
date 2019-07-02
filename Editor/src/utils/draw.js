import { drawTile } from '../../../src/utils/canvas';
import { backgroundTile } from '../variables';
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

function _drawMap(store, drawTile) {
  return () => {
    const {
      canvas: { map },
      images: { background },
      contexts: { background: context },
    } = store.getState();

    map.forEach((subMap, y) => {
      subMap.forEach((element, x) => {
        if (element) {
          drawTile({
            tile: backgroundTile,
            tileImg: background,
            tileId: element.id === undefined ? element.ids[0] : element.id,
            context,
            xDest: x * backgroundTile.width,
            yDest: y * backgroundTile.height,
          });
        }
      });
    });
  };
}

export const drawElementList = _drawElementList(drawTile);

export const drawMap = _drawMap(store, drawTile);
