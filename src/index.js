import map from './maps';
import { drawMap } from './map.constructor';
import { backgroundTile, playerTile } from './constant';
import { createCanvas, drawTile } from './canvas.constructor';

// var key, wall, animation = 0, tempo = 100, distance=16, anim = 1, x = 32, y = 26;

window.addEventListener('DOMContentLoaded', () => {
  const backgroundContext = createCanvas({
    id: 'canvas_background',
    element: document.body,
  });
  const playerContext = createCanvas({
    id: 'canvas_player',
    element: document.body,
  });
  const sliderInput = document.getElementById('slider');
  sliderInput.addEventListener('input', e => {
    playerContext.filter = `hue-rotate(${e.target.value}deg)`;
    playerContext.clearRect(0, 0, 16 * 18, 16 * 16);
    Array(12)
      .fill(null)
      .forEach((_, index) => {
        drawTile({
          tile: playerTile,
          tileImg: playerImg,
          tileId: index,
          context: playerContext,
          xDest: index * 16,
          yDest: index * 16,
        });
      });
  });

  playerContext.shadowBlur = 1;
  playerContext.shadowColor = 'rgba(0,0,0,.5)';
  playerContext.shadowOffsetX = 0;
  playerContext.shadowOffsetY = 0;

  // const context = document.getElementById(canvas.backgroundId).getContext('2d');

  const tileImg = new Image();
  tileImg.onload = function() {
    drawMap(map, backgroundContext, tileImg);
  };
  tileImg.src = backgroundTile.src;

  const playerImg = new Image();
  playerImg.onload = function() {
    Array(12)
      .fill(null)
      .forEach((_, index) => {
        drawTile({
          tile: playerTile,
          tileImg: playerImg,
          tileId: index,
          context: playerContext,
          xDest: index * 16,
          yDest: index * 16,
        });
      });
  };
  playerImg.src = playerTile.src;
  // dessinerPerso(5, ctx2, x, y);
});
