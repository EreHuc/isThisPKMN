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
  setStatusPlaying,
  getMapStatus,
} from './store';
import {
  loadBackground,
  loadPlayer,
  loadPikachu,
  loadPkmn,
  loadMelofee,
  loadJessie,
  loadJames,
} from './scripts/asset-loader';
import maps from './maps';
import handleMapScale from './UI/change-map-scale';
import {
  MAP_STATUS_INIT,
  MAP_STATUS_LOADING,
  MAP_STATUS_PLAYING,
} from './variables';
import animations from './scripts/animations';

/**
 * Init map and make it playable
 * @param map
 */
function initMap(map) {
  store.dispatch(setPlayerPosition(map.startPosition));
  store.dispatch(setMap(map));
  store.dispatch(setStatusPlaying());
}

/**
 * Handle change map lifecycle
 * @param fadeElement
 * @returns {Function}
 */
function handleMapLifeCycle(fadeElement) {
  let oldStatus;

  return () => {
    const status = getMapStatus();

    if (oldStatus !== status) {
      oldStatus = status;

      switch (status) {
        case MAP_STATUS_INIT:
          fadeElement.classList.add('in');

          // eslint-disable-next-line no-console
          console.log(MAP_STATUS_INIT);
          break;
        case MAP_STATUS_LOADING:
          fadeElement.classList.add('in');

          // eslint-disable-next-line no-console
          console.log(MAP_STATUS_LOADING);
          animations.stop();
          break;
        case MAP_STATUS_PLAYING:
          fadeElement.classList.remove('in');

          // eslint-disable-next-line no-console
          console.log(MAP_STATUS_PLAYING);
          animations.start();
          break;
      }
    }
  };
}

/**
 * Load all mandatory data to the game
 */
export function initEngine() {
  const fadeElement = document.getElementById('gbc-canvas-fade');
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
    loadPlayer.then(playerImg => {
      store.dispatch(setBackgroundImage(backgroundImg));
      store.dispatch(setPlayerImage(playerImg));
      store.dispatch(setPlayerCurrentImage(playerImg));
      initMap(maps.default);
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

  handleMapScale();

  store.subscribe(handleMapLifeCycle(fadeElement));
}

// Start fadeout
// Stop animation
// If same map then change playerPositions
// Else load next map and set playerPositions
// Start animation
// End Fadeout
