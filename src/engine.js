import {
  createBackgroundCanvas,
  createForegroundCanvas,
  createPlayerCanvas,
} from './utils/canvas';
import { backgroundTile, playerTile } from './variables';
import map from './maps';
import {
  setPlayerCurrentImage,
  setPlayerPosition,
} from './store/actions/player.actions';
import {
  setBackgroundContext,
  setForegroundContext,
  setPlayerContext,
} from './store/actions/contexts.actions';
import {
  setAltPlayerImage,
  setBackgroundImage,
  setPlayerImage,
} from './store/actions/images.actions';
import { animations } from './utils/animations';
import {
  setBackgroundMap,
  setCollisionMap,
  setForegroundMap,
  setScale,
  setTilePerColumn,
  setTilePerRow,
} from './store/actions/map.actions';

function initGame(store) {
  const foregroundContext = createForegroundCanvas();
  const backgroundContext = createBackgroundCanvas();
  const playerContext = createPlayerCanvas({
    shadowBlur: 1,
    shadowColor: 'rgba(0,0,0,.5)',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
  });

  store.dispatch(setForegroundContext(foregroundContext));
  store.dispatch(setPlayerContext(playerContext));
  store.dispatch(setBackgroundContext(backgroundContext));

  loadBackground.then(backgroundImg => {
    // drawMap({ map, context: backgroundContext, backgroundImg });
    store.dispatch(setPlayerPosition(map.startPosition));
    store.dispatch(setBackgroundImage(backgroundImg));

    loadPlayer.then(playerImg => {
      store.dispatch(setPlayerImage(playerImg));
      store.dispatch(setPlayerCurrentImage(playerImg));
      store.dispatch(setBackgroundMap(map.background));
      store.dispatch(setForegroundMap(map.foreground));
      store.dispatch(setCollisionMap(map.layer));
      store.dispatch(setTilePerRow(map.tilePerRow));
      store.dispatch(setTilePerColumn(map.tilePerColumn));
      // playerAnimation.start();
      animations.start();
    });
  });

  loadPikachu.then(altPlayerImage => {
    store.dispatch(setAltPlayerImage('pikachu', altPlayerImage));
  });

  loadPkmn.then(altPlayerImage => {
    store.dispatch(setAltPlayerImage('pkmn', altPlayerImage));
  });

  loadMelofee.then(altPlayerImage => {
    store.dispatch(setAltPlayerImage('melofee', altPlayerImage));
  });

  loadJessie.then(altPlayerImage => {
    store.dispatch(setAltPlayerImage('jessie', altPlayerImage));
  });

  loadJames.then(altPlayerImage => {
    store.dispatch(setAltPlayerImage('james', altPlayerImage));
  });

  document.getElementById('down-scale').addEventListener('click', () => {
    const {
      map: { scale },
    } = store.getState();

    store.dispatch(setScale(scale - 1));
  });
  document.getElementById('up-scale').addEventListener('click', () => {
    const {
      map: { scale },
    } = store.getState();

    store.dispatch(setScale(scale + 1));
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

const loadPikachu = loadImage(playerTile.pikachuSrc);
const loadPkmn = loadImage(playerTile.pkmnSrc);
const loadMelofee = loadImage(playerTile.melofeeSrc);
const loadJessie = loadImage(playerTile.jessieSrc);
const loadJames = loadImage(playerTile.jamesSrc);

export { initGame };
