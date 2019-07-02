import { createCanvas } from '../../src/utils/canvas';
import {
  backgroundCanvas as bCanvas,
  elementCanvas as eCanvas,
} from './variables';
import { drawElementList } from './utils/draw';
import { backgroundTile } from '../../src/variables';
import { store } from './store';
import { setBackgroundImage } from './store/actions/images.actions';
import {
  setBackgroundContext,
  setElementsContext,
  setForegroundContext,
} from './store/actions/contexts.actions';
import {
  setBackgroundMap,
  setForegroundMap,
  setSelectedCanvas,
  setSelectedElement,
} from './store/actions/canvas.actions';
import { animation } from './utils/animations';

window.addEventListener('DOMContentLoaded', () => {
  const elementContext = createCanvas({
    id: 'element-canvas',
    containerElement: document.getElementById('canvas-container'),
    height: eCanvas.height,
    width: eCanvas.width,
    scale: 1,
  })();

  const foregroundContext = createCanvas({
    id: 'foreground-canvas',
    containerElement: document.getElementById('canvas-container'),
    height: bCanvas.height,
    width: bCanvas.width,
    scale: 1,
  })();

  const backgroundContext = createCanvas({
    id: 'background-canvas',
    containerElement: document.getElementById('canvas-container'),
    height: bCanvas.height,
    width: bCanvas.width,
    scale: 1,
  })();

  elementContext.scale(eCanvas.scale, eCanvas.scale);
  foregroundContext.scale(eCanvas.scale, eCanvas.scale);
  backgroundContext.scale(bCanvas.scale, bCanvas.scale);

  store.dispatch(setBackgroundContext(backgroundContext));
  store.dispatch(setForegroundContext(foregroundContext));
  store.dispatch(setElementsContext(elementContext));

  const elementCanvas = document.getElementById('element-canvas');
  const backgroundCanvas = document.getElementById('background-canvas');
  const foregroundCanvas = document.getElementById('foreground-canvas');
  const switchCanvasElement = document.getElementById('switch');

  elementCanvas.addEventListener(
    'click',
    getCurrentElementOnClickHandler(elementCanvas, store),
  );

  foregroundCanvas.addEventListener(
    'click',
    setCurrentElementOnClickHandler(backgroundCanvas, store),
  );

  switchCanvasElement.addEventListener('input', ({ target: { checked } }) => {
    const label = checked === true ? 'background' : 'foreground';
    document.getElementById('switch-label').innerText = label;
    store.dispatch(setSelectedCanvas(label));
  });

  loadBackground.then(backgroundImg => {
    store.dispatch(setBackgroundImage(backgroundImg));
    drawElementList(elementContext, backgroundImg);
    animation.start();
  });
});

const getCurrentElementOnClickHandler = (
  elementCanvas,
  store,
) => clickEvent => {
  const elements = Object.entries(backgroundTile.list);
  const { x, y } = getMousePos(elementCanvas, clickEvent);
  const elementX = Math.floor(x / (backgroundTile.width * eCanvas.scale));
  const elementY = Math.floor(y / (backgroundTile.height * eCanvas.scale));
  const indexToTarget = elementY * eCanvas.elementPerRow + elementX;

  // eslint-disable-next-line no-unused-vars
  const selectedElement = elements.find(([_, { id, ids }]) => {
    if (id === undefined) {
      return ids[0] === indexToTarget;
    } else {
      return id === indexToTarget;
    }
  });

  if (selectedElement) {
    store.dispatch(setSelectedElement(backgroundTile.list[selectedElement[0]]));
  }
};

const setCurrentElementOnClickHandler = (
  backgroundCanvas,
  store,
) => clickEvent => {
  const {
    canvas: { selectedElement, selectedCanvas },
  } = store.getState();

  const { x, y } = getMousePos(backgroundCanvas, clickEvent);
  const backgroundX = Math.floor(x / (backgroundTile.width * eCanvas.scale));
  const backgroundY = Math.floor(y / (backgroundTile.height * eCanvas.scale));

  if (selectedElement) {
    switch (selectedCanvas) {
      case 'background':
        store.dispatch(
          setBackgroundMap(backgroundX, backgroundY, selectedElement),
        );
        break;
      case 'foreground':
        store.dispatch(
          setForegroundMap(backgroundX, backgroundY, selectedElement),
        );
        break;
    }
  }
};

function getMousePos(canvas, mouseEvent) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: mouseEvent.clientX - rect.left,
    y: mouseEvent.clientY - rect.top,
  };
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
