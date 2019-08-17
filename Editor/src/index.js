import { drawElementList } from './scripts/draw';
import { backgroundTile } from './variables';
import { store } from './store';
import { setBackgroundImage } from './store/actions/images.actions';
import { animation } from './scripts/animations';
import { exportMaps, resetMap, uploadMaps } from './scripts/maps';
import setup from './scripts/setup';
import {
  getCurrentElementOnClickHandler,
  setCurrentElementOnClickHandler,
  switchBackgroundForegroundHandler,
  toggleBackgroundHandler,
  toggleCollisionHandler,
  toggleForegroundHandler,
  toggleGridHandler,
} from './scripts/eventsHandler';
import '@babel/polyfill';

window.addEventListener('DOMContentLoaded', () => {
  setup.setContexts();
  setup.loadDataFromLocalStorage();

  const elementCanvas = document.getElementById('elements-canvas');
  const elementGridCanvas = document.getElementById('elements-grid-canvas');
  const backgroundCanvas = document.getElementById('background-canvas');
  const foregroundCanvas = document.getElementById('foreground-canvas');
  const collisionCanvas = document.getElementById('collision-canvas');
  const gridCanvas = document.getElementById('background-grid-canvas');
  const switchCanvas = document.getElementById('canvas-btn');
  const switchCanvasCollision = document.getElementById('collision-btn');

  loadBackground.then(backgroundImg => {
    const {
      contexts: { elements },
    } = store.getState();

    store.dispatch(setBackgroundImage(backgroundImg));

    drawElementList(elements, backgroundImg);

    animation.start();

    elementGridCanvas.addEventListener(
      'click',
      getCurrentElementOnClickHandler(elementCanvas, store),
    );

    gridCanvas.addEventListener(
      'click',
      setCurrentElementOnClickHandler(backgroundCanvas, store),
    );

    collisionCanvas.addEventListener(
      'click',
      setCurrentElementOnClickHandler(collisionCanvas, store),
    );

    switchCanvas.addEventListener(
      'click',
      switchBackgroundForegroundHandler(store),
    );

    switchCanvasCollision.addEventListener('click', toggleCollisionHandler);

    document.getElementById('dl-btn').addEventListener('click', exportMaps);

    document
      .getElementById('reset-map-btn')
      .addEventListener('click', resetMap);

    document
      .getElementById('toggle-background-btn')
      .addEventListener('click', toggleBackgroundHandler(backgroundCanvas));

    document
      .getElementById('toggle-foreground-btn')
      .addEventListener('click', toggleForegroundHandler(foregroundCanvas));

    document
      .getElementById('toggle-grid-btn')
      .addEventListener('click', toggleGridHandler(gridCanvas));

    document
      .getElementById('upload-files-form')
      .addEventListener('submit', uploadMaps);
  });
});

window.addEventListener('beforeunload', setup.saveDataInLocalStorage);

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
