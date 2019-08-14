export function drawTile({ tile, tileImg, tileId, context, xDest, yDest }) {
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

export function clearTile({ context, x, y, w, h }) {
  return context.clearRect(x, y, w, h);
}
