import {
  createBackgroundCanvas,
  createPlayerCanvas,
  drawTile,
} from './utils/canvas';
import { backgroundTile, playerTile } from './variables';
import { drawMap } from './utils/map';
import map from './maps';
import { drawPlayer, playerMovement } from './utils/player';
import {
  setPlayerCurrentImage,
  setPlayerPosition,
} from './store/actions/player.actions';
import {
  setBackgroundContext,
  setPlayerContext,
} from './store/actions/contexts.actions';
import {
  setAltPlayerImage,
  setBackgroundImage,
  setPlayerImage,
} from './store/actions/images.actions';

function initGame(store) {
  const backgroundContext = createBackgroundCanvas();

  const playerContext = createPlayerCanvas({
    shadowBlur: 1,
    shadowColor: 'rgba(0,0,0,.5)',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
  });

  store.dispatch(setBackgroundContext(backgroundContext));
  store.dispatch(setPlayerContext(playerContext));

  // const sliderInput = document.getElementById('slider');

  loadBackground.then(backgroundImg => {
    drawMap({ map: map.tileList, context: backgroundContext, backgroundImg });
    store.dispatch(setPlayerPosition(map.startPosition));
    store.dispatch(setBackgroundImage(backgroundImg));

    loadPlayer.then(playerImg => {
      // const playerDirection = store.getState().player.direction;
      //
      // Array(12)
      //   .fill(null)
      //   .forEach((_, index) => {
      //     drawPlayer({
      //       context: playerContext,
      //       playerImg,
      //       playerPosition: {
      //         x: index * 16,
      //         y: index * 16,
      //       },
      //       playerDirection,
      //     });
      //   });

      // sliderInput.addEventListener('input', e => {
      //   playerContext.filter = `hue-rotate(${e.target.value}deg)`;
      //   playerContext.clearRect(0, 0, 16 * 18, 16 * 16);
      //   Array(12)
      //     .fill(null)
      //     .forEach((_, index) => {
      //       drawTile({
      //         tile: playerTile,
      //         tileImg: playerImg,
      //         tileId: index,
      //         context: playerContext,
      //         xDest: index * 16,
      //         yDest: index * 16,
      //       });
      //     });
      // });

      store.dispatch(setPlayerImage(playerImg));
      store.dispatch(setPlayerCurrentImage(playerImg));
      playerMovement.start();
    });
  });

  loadAltPlayer.then(altPlayerImage => {
    store.dispatch(setAltPlayerImage(altPlayerImage));
  });
}

function loadImage(src) {
  return new Promise(resolve => {
    const image = new Image();
    image.onload = loadEvent => resolve(loadEvent.path[0]);
    image.src = src;
  });
}

const loadBackground = loadImage(backgroundTile.src);

const loadPlayer = loadImage(playerTile.src);

const loadAltPlayer = loadImage(playerTile.altSrc);

export { initGame };
