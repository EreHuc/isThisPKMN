import {
  createBackgroundCanvas,
  createForegroundCanvas,
  createPlayerCanvas,
} from './scripts/canvas';
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
import { animations } from './scripts/animations';
import {
  setMap,
  setScale,
  setStatusPlaying,
} from './store/actions/map.actions';
import {
  loadBackground,
  loadPlayer,
  loadPikachu,
  loadPkmn,
  loadMelofee,
  loadJessie,
  loadJames,
} from './scripts/asset-loader';
import localState from './scripts/local-state';
import { MAP_STATUS_LOADING, MAP_STATUS_PLAYING } from './variables';

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
      store.dispatch(setMap(map));
      store.dispatch(setStatusPlaying());
      // animations.start();
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
  const state = localState();

  store.subscribe(() => {
    const {
      map: { status },
    } = store.getState();

    const { status: oldStatus = status } = state.getLocalState();

    if (oldStatus !== status) {
      switch (status) {
        case MAP_STATUS_LOADING:
          console.log(MAP_STATUS_LOADING);
          animations.stop();
          break;
        case MAP_STATUS_PLAYING:
          animations.start();
          break;
      }
    }

    state.setLocalState({
      status,
    });
  });
}

export { initGame };
