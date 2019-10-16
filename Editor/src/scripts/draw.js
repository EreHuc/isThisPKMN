import { clearTile, drawTile } from '../../../Game/src/scripts/canvas';
import {
  backgroundCanvas,
  backgroundTile,
  elementCanvas as eCanvas,
  elementCanvas,
  layer,
} from '../variables';
import { store } from '../store';
import { getId } from './utils';

function _drawElementList(drawTile) {
  return (
    elementContext,
    backgroundImg,
    maxPerRow = elementCanvas.elementPerRow,
  ) => {
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
        background: backgroundMap,
        foreground: foregroundMap,
        playerPositions,
      },
      images: { background },
      contexts: {
        background: backgroundContext,
        foreground: foregroundContext,
        collision: collisionContext,
        backgroundGrid: backgroundGridContext,
        elementsGrid: elementsGridContext,
      },
    } = store.getState();

    [
      collisionContext,
      backgroundContext,
      foregroundContext,
      backgroundGridContext,
      elementsGridContext,
    ].forEach(context =>
      clearTile({
        context,
        y: 0,
        x: 0,
        w: backgroundCanvas.width,
        h: backgroundCanvas.height,
      }),
    );

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

    [
      [backgroundGridContext, backgroundCanvas],
      [elementsGridContext, elementCanvas],
    ].forEach(context => {
      drawGrid(...context);
    });

    if (playerPositions.x && playerPositions.y) {
      drawTile({
        tile: backgroundTile,
        tileImg: background,
        tileId: backgroundTile.list.start.id,
        context: foregroundContext,
        xDest: playerPositions.x * backgroundTile.width,
        yDest: playerPositions.y * backgroundTile.height,
      });
    }

    // TODO: REFACTO
    drawSelector();
    drawLayer();
  };
}

function _drawSelector(store) {
  return () => {
    const {
      canvas: { selectedElement, selectedCanvas, selectedElementPositions },
      contexts: { elementsSelector },
    } = store.getState();
    const [color, colorTrs] =
      selectedCanvas === 'background'
        ? ['rgba(255, 215, 0, 1)', 'rgba(255, 215, 0, .5)']
        : ['rgb(221, 160, 221, 1)', 'rgb(221, 160, 221, .5)'];

    if (selectedElement) {
      elementsSelector.clearRect(0, 0, eCanvas.width * 32, eCanvas.height * 32);
      elementsSelector.fillStyle = colorTrs;
      elementsSelector.strokeStyle = color;
      elementsSelector.strokeRect(
        selectedElementPositions.x * 32,
        selectedElementPositions.y * 32,
        backgroundTile.width * 2,
        backgroundTile.height * 2,
      );
      elementsSelector.fillRect(
        selectedElementPositions.x * 32,
        selectedElementPositions.y * 32,
        backgroundTile.width * 2,
        backgroundTile.height * 2,
      );
    }
  };
}

function setPortalText(x, y, movePoints, collisionContext) {
  const id = getId(x, y);
  collisionContext.strokeStyle = 'black';
  collisionContext.fillStyle = 'white';
  collisionContext.fillText(
    movePoints[id].id,
    x * 32 + backgroundTile.width,
    y * 32 + backgroundTile.height,
    backgroundTile.width * 2 - 4,
  );
  collisionContext.strokeText(
    movePoints[id].id,
    x * 32 + backgroundTile.width,
    y * 32 + backgroundTile.height,
    backgroundTile.width * 2 - 4,
  );
}

function _drawLayer(store) {
  return () => {
    const {
      contexts: { collision: collisionContext },
      canvas: { collision: collisionMap, movePoints },
    } = store.getState();

    collisionMap.forEach((row, y) => {
      row.forEach((col, x) => {
        switch (col) {
          case layer.floor:
          case layer.player:
            collisionContext.fillStyle = 'transparent';
            collisionContext.strokeStyle = 'transparent';
            break;
          case layer.obstacle:
            collisionContext.fillStyle = 'rgba(255, 255, 255, .5)';
            collisionContext.strokeStyle = 'white';
            break;
          case layer.tpIn:
            setPortalText(x, y, movePoints, collisionContext);
            collisionContext.fillStyle = 'rgba(95,110,255,0.5)';
            collisionContext.strokeStyle = 'blue';
            break;
          case layer.tpOut:
            setPortalText(x, y, movePoints, collisionContext);
            collisionContext.strokeStyle = 'orange';
            collisionContext.fillStyle = 'rgba(255,156,97,0.5)';
            break;
        }
        collisionContext.strokeRect(
          x * 32,
          y * 32,
          backgroundTile.width * 2,
          backgroundTile.height * 2,
        );
        collisionContext.fillRect(
          x * 32,
          y * 32,
          backgroundTile.width * 2,
          backgroundTile.height * 2,
        );
      });
    });
  };
}

const drawSelector = _drawSelector(store);

const drawLayer = _drawLayer(store);

function drawGrid(context, canvasDetail) {
  context.strokeStyle = 'rgba(0, 0, 0, .5)';
  for (let y = 0; y < canvasDetail.height / 32; y++) {
    context.beginPath();
    context.moveTo(0, y * 32);
    context.lineTo(canvasDetail.width, y * 32);
    context.closePath();
    context.stroke();
  }
  for (let x = 0; x < canvasDetail.width / 32; x++) {
    context.beginPath();
    context.moveTo(x * 32, 0);
    context.lineTo(x * 32, canvasDetail.height);
    context.closePath();
    context.stroke();
  }
}

export const drawElementList = _drawElementList(drawTile);

export const drawMap = _drawMap(store, drawTile, clearTile);
