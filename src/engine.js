import { createBackgroundCanvas, createPlayerCanvas } from './utils/canvas';
import { backgroundTile, playerTile } from './variables';
import { drawMap } from './utils/map';
import map from './maps';
import { playerAnimation } from './utils/player';
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

  loadBackground.then(backgroundImg => {
    drawMap({ map: map.tileList, context: backgroundContext, backgroundImg });
    store.dispatch(setPlayerPosition(map.startPosition));
    store.dispatch(setBackgroundImage(backgroundImg));

    loadPlayer.then(playerImg => {
      store.dispatch(setPlayerImage(playerImg));
      store.dispatch(setPlayerCurrentImage(playerImg));
      playerAnimation.start();
    });
  });

  loadAltPlayer.then(altPlayerImage => {
    store.dispatch(setAltPlayerImage(altPlayerImage));
  });
}

function loadImage(src) {
  return new Promise(resolve => {
    const image = new Image();
    image.onload = loadEvent => {
      resolve(loadEvent.target);
    };
    image.src = src;
  });
}

const loadBackground = loadImage(backgroundTile.src);

const loadPlayer = loadImage(playerTile.src);

const loadAltPlayer = loadImage(playerTile.altSrc);

export { initGame };
