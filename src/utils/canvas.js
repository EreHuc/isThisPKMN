import { canvas as canvasDetail, playerTile } from '../variables';
import { store } from '../store';

function createCanvas({
  id,
  element,
  scale = canvasDetail.scale,
  width = canvasDetail.width,
  height = canvasDetail.height,
}) {
  return function(options = {}) {
    const canvas = document.createElement('canvas');
    canvas.classList.add('canvas');
    canvas.setAttribute('id', id);
    canvas.width = width * scale;
    canvas.height = height * scale;

    const context = element
      .insertBefore(canvas, element.firstChild)
      .getContext('2d');

    context.imageSmoothingEnabled = false;

    Object.entries(options).forEach(([key, value]) => {
      context[key] = value;
    });

    return context;
  };
}

function drawTile({ tile, tileImg, tileId, context, xDest, yDest }) {
  const xSource = (tileId % tile.tilePerRow) * tile.width;
  const ySource = Math.floor(tileId / tile.tilePerRow) * tile.height;

  context.drawImage(
    tileImg,
    xSource,
    ySource,
    tile.width,
    tile.height,
    xDest,
    yDest,
    tile.width,
    tile.height,
  );
}

function setTransform(x, y, context) {
  context.setTransform(
    canvasDetail.scale,
    0,
    0,
    canvasDetail.scale,
    -canvasDetail.scale * (x - canvasDetail.width / 2 + playerTile.width / 2),
    -canvasDetail.scale * (y - canvasDetail.height / 2 + playerTile.height / 2),
  );
}

function _setContextTransform(store) {
  return map => {
    const {
      player: {
        positions: { x, y },
      },
      contexts,
    } = store.getState();

    Object.values(contexts).forEach(context => {
      setTransform(x, y, context, map);
    });
  };
}

function clearTile({ context, x, y, w, h }) {
  return context.clearRect(x, y, w, h);
}

const createBackgroundCanvas = createCanvas({
  id: 'canvas_background',
  element: document.getElementById('gbc-canvas'),
});

const createPlayerCanvas = createCanvas({
  id: 'canvas_player',
  element: document.getElementById('gbc-canvas'),
});

export const setContextTransform = _setContextTransform(store);

export {
  drawTile,
  clearTile,
  createBackgroundCanvas,
  createPlayerCanvas,
  setTransform,
};
