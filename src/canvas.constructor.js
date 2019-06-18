import { canvas as canvasDetail } from './constant';

function createCanvas({
  id,
  element,
  scale = canvasDetail.scale,
  width = canvasDetail.width,
  height = canvasDetail.height,
}) {
  const canvas = document.createElement('canvas');
  canvas.classList.add('canvas');
  canvas.setAttribute('id', id);
  canvas.width = width * scale;
  canvas.height = height * scale;

  const context = element
    .insertBefore(canvas, element.firstChild)
    .getContext('2d');
  context.scale(scale, scale);
  context.imageSmoothingEnabled = false;

  return context;
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

export { createCanvas, drawTile };
