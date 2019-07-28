import { createCanvas } from '../../../src/utils/canvas';
import {
  backgroundCanvas as bCanvas,
  elementCanvas as eCanvas,
} from '../variables';
import { store } from '../store';
import {
  setBackgroundContext,
  setBackgroundGridContext,
  setElementsContext,
  setElementsGridContext,
  setElementsSelectorContext,
  setForegroundContext,
  setCollisionContext,
} from '../store/actions/contexts.actions';
import {
  initCanvas,
  setPlayerPositions,
} from '../store/actions/canvas.actions';

function _setContexts(store) {
  return () => {
    const elementContext = createCanvas({
      id: 'elements-canvas',
      containerElement: document.getElementById('canvas-element-container'),
      height: eCanvas.height,
      width: eCanvas.width,
      scale: 1,
    })();
    const collisionContext = createCanvas({
      id: 'collision-canvas',
      containerElement: document.getElementById('canvas-map-container'),
      height: bCanvas.height,
      width: bCanvas.width,
      scale: 1,
      className: 'hidden',
    })();
    const backgroundGridContext = createCanvas({
      id: 'background-grid-canvas',
      containerElement: document.getElementById('canvas-map-container'),
      height: bCanvas.height,
      width: bCanvas.width,
      scale: 1,
    })();
    const foregroundContext = createCanvas({
      id: 'foreground-canvas',
      containerElement: document.getElementById('canvas-map-container'),
      height: bCanvas.height,
      width: bCanvas.width,
      scale: 1,
    })();
    const backgroundContext = createCanvas({
      id: 'background-canvas',
      containerElement: document.getElementById('canvas-map-container'),
      height: bCanvas.height,
      width: bCanvas.width,
      scale: 1,
    })();
    const elementsGridContext = createCanvas({
      id: 'elements-grid-canvas',
      containerElement: document.getElementById('canvas-element-container'),
      height: eCanvas.height,
      width: eCanvas.width,
      scale: 1,
    })();
    const elementsSelectorContext = createCanvas({
      id: 'elements-selector-canvas',
      containerElement: document.getElementById('canvas-element-container'),
      height: eCanvas.height,
      width: eCanvas.width,
      scale: 1,
    })();

    elementContext.scale(eCanvas.scale, eCanvas.scale);
    foregroundContext.scale(eCanvas.scale, eCanvas.scale);
    backgroundContext.scale(bCanvas.scale, bCanvas.scale);
    elementsSelectorContext.lineWidth = 2;
    elementsSelectorContext.lineJoin = 'bevel';
    collisionContext.lineWidth = 2;
    collisionContext.lineJoin = 'bevel';

    store.dispatch(setBackgroundContext(backgroundContext));
    store.dispatch(setForegroundContext(foregroundContext));
    store.dispatch(setElementsContext(elementContext));
    store.dispatch(setBackgroundGridContext(backgroundGridContext));
    store.dispatch(setElementsGridContext(elementsGridContext));
    store.dispatch(setElementsSelectorContext(elementsSelectorContext));
    store.dispatch(setCollisionContext(collisionContext));
  };
}

function _loadDataFromLocalStorage(store) {
  return () => {
    const oldCanvasState = JSON.parse(localStorage.getItem('canvas'));

    oldCanvasState && store.dispatch(initCanvas(oldCanvasState));
  };
}

function _saveDataInLocalStorage(store) {
  return () => {
    const { canvas } = store.getState();

    localStorage.setItem('canvas', JSON.stringify(canvas));
  };
}

export default {
  setContexts: _setContexts(store),
  loadDataFromLocalStorage: _loadDataFromLocalStorage(store),
  saveDataInLocalStorage: _saveDataInLocalStorage(store),
};
