import {
  createBackgroundCanvas,
  createForegroundCanvas,
  createPlayerCanvas,
} from './scripts/canvas';
import store, {
  setPlayerCurrentImage,
  setPlayerPosition,
  setBackgroundContext,
  setForegroundContext,
  setPlayerContext,
  setAltPlayerImage,
  setBackgroundImage,
  setPlayerImage,
  setMap,
  setScale,
  setStatusPlaying,
  getMapStatus,
  getMapScale,
} from './store';
import { animations } from './scripts/animations';
import {
  loadBackground,
  loadPlayer,
  loadPikachu,
  loadPkmn,
  loadMelofee,
  loadJessie,
  loadJames,
} from './scripts/asset-loader';
import { MAP_STATUS_LOADING, MAP_STATUS_PLAYING } from './variables';
import map from './maps';

export function initGame() {
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
    store.dispatch(setPlayerPosition(map.startPosition));
    store.dispatch(setBackgroundImage(backgroundImg));

    loadPlayer.then(playerImg => {
      store.dispatch(setPlayerImage(playerImg));
      store.dispatch(setPlayerCurrentImage(playerImg));
      store.dispatch(setMap(map));
      store.dispatch(setStatusPlaying());
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
    const scale = getMapScale();

    store.dispatch(setScale(scale - 1));
  });
  document.getElementById('up-scale').addEventListener('click', () => {
    const scale = getMapScale();

    store.dispatch(setScale(scale + 1));
  });

  let oldStatus;

  store.subscribe(() => {
    const status = getMapStatus();

    if (oldStatus !== status) {
      switch (status) {
        case MAP_STATUS_LOADING:
          // eslint-disable-next-line no-console
          console.log(MAP_STATUS_LOADING);
          animations.stop();
          break;
        case MAP_STATUS_PLAYING:
          // eslint-disable-next-line no-console
          console.log(MAP_STATUS_PLAYING);
          animations.start();
          break;
      }
    }

    oldStatus = status;
  });
}
