import { canvas, playerTile } from '../variables';
import { store } from '../store';

export function createCanvas({
  id,
  containerElement,
  width = canvas.width,
  height = canvas.height,
}) {
  return function(options = {}) {
    const canvas = document.createElement('canvas');
    canvas.classList.add('canvas');
    canvas.setAttribute('id', id);
    canvas.width = width;
    canvas.height = height;

    const context = containerElement
      .insertBefore(canvas, containerElement.firstChild)
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

function setTransform(
  x,
  y,
  context,
  scale = canvas.scale,
  width = canvas.width,
  height = canvas.height,
) {
  context.setTransform(
    scale,
    0,
    0,
    scale,
    -scale * (x - width / (2 * scale) + playerTile.width / 2),
    -scale * (y - height / (2 * scale) + playerTile.height / 2),
  );
}

function _setContextTransform(store) {
  return () => {
    const {
      player: {
        positions: { x, y },
      },
      contexts,
      map: { scale = canvas.scale },
    } = store.getState();

    Object.values(contexts).forEach(context => {
      setTransform(x, y, context, scale);
    });
  };
}

function clearTile({ context, x, y, w, h }) {
  return context.clearRect(x, y, w, h);
}

const createBackgroundCanvas = createCanvas({
  id: 'canvas_background',
  containerElement: document.getElementById('gbc-canvas'),
});

const createForegroundCanvas = createCanvas({
  id: 'canvas_foreground',
  containerElement: document.getElementById('gbc-canvas'),
});

const createPlayerCanvas = createCanvas({
  id: 'canvas_player',
  containerElement: document.getElementById('gbc-canvas'),
});

export const setContextTransform = _setContextTransform(store);

export {
  drawTile,
  clearTile,
  createForegroundCanvas,
  createBackgroundCanvas,
  createPlayerCanvas,
  setTransform,
};
