import { createCanvas } from '../../src/utils/canvas';
import {
  backgroundCanvas as bCanvas,
  elementCanvas as eCanvas,
} from './variables';
import { drawElementList, drawGrid } from './utils/draw';
import { backgroundTile } from './variables';
import { store } from './store';
import { setBackgroundImage } from './store/actions/images.actions';
import {
  setBackgroundContext,
  setBackgroundGridContext,
  setElementsContext,
  setElementsGridContext,
  setForegroundContext,
} from './store/actions/contexts.actions';
import {
  setBackgroundMap,
  setForegroundMap,
  setMaps,
  setSelectedCanvas,
  setSelectedElement,
} from './store/actions/canvas.actions';
import { animation } from './utils/animations';
import { exportMaps, uploadMaps } from './utils';

window.addEventListener('DOMContentLoaded', () => {
  const elementContext = createCanvas({
    id: 'element-canvas',
    containerElement: document.getElementById('canvas-container'),
    height: eCanvas.height,
    width: eCanvas.width,
    scale: 1,
  })();

  const backgroundGridContext = createCanvas({
    id: 'background-grid-canvas',
    containerElement: document.getElementById('canvas-container'),
    height: bCanvas.height,
    width: bCanvas.width,
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

  const elementsGridContext = createCanvas({
    id: 'elements-grid-canvas',
    containerElement: document.getElementById('canvas-container'),
    height: eCanvas.height,
    width: eCanvas.width,
    scale: 1,
  })();

  const oldMaps = JSON.parse(localStorage.getItem('maps') || '[]');

  oldMaps && oldMaps.background && store.dispatch(setMaps(oldMaps));

  elementContext.scale(eCanvas.scale, eCanvas.scale);
  foregroundContext.scale(eCanvas.scale, eCanvas.scale);
  backgroundContext.scale(bCanvas.scale, bCanvas.scale);

  store.dispatch(setBackgroundContext(backgroundContext));
  store.dispatch(setForegroundContext(foregroundContext));
  store.dispatch(setElementsContext(elementContext));
  store.dispatch(setBackgroundGridContext(backgroundGridContext));
  store.dispatch(setElementsGridContext(elementsGridContext));

  const elementCanvas = document.getElementById('element-canvas');
  const backgroundCanvas = document.getElementById('background-canvas');
  const foregroundCanvas = document.getElementById('foreground-canvas');
  const gridCanvas = document.getElementById('background-grid-canvas');
  const switchCanvasElement = document.getElementById('layer-btn');

  drawGrid(backgroundGridContext, bCanvas);
  drawGrid(elementsGridContext, eCanvas);

  elementCanvas.addEventListener(
    'click',
    getCurrentElementOnClickHandler(elementCanvas, store),
  );

  gridCanvas.addEventListener(
    'click',
    setCurrentElementOnClickHandler(backgroundCanvas, store),
  );

  switchCanvasElement.addEventListener('click', ({ target }) => {
    const { innerText } = target;
    if (innerText === 'Background') {
      store.dispatch(setSelectedCanvas('foreground'));
      target.innerText = 'Foreground';
    } else {
      store.dispatch(setSelectedCanvas('background'));
      target.innerText = 'Background';
    }
  });

  loadBackground.then(backgroundImg => {
    store.dispatch(setBackgroundImage(backgroundImg));
    drawElementList(elementContext, backgroundImg);
    animation.start();
  });

  document.getElementById('dl-btn').addEventListener('click', exportMaps);
  document.getElementById('reset-map-btn').addEventListener('click', () => {
    store.dispatch(setMaps({}));
  });
  document
    .getElementById('toggle-background-btn')
    .addEventListener('click', ({ target }) => {
      backgroundCanvas.classList.toggle('hidden');
      if (backgroundCanvas.getAttribute('class').includes('hidden')) {
        target.innerText = 'Show background';
      } else {
        target.innerText = 'Hide background';
      }
    });

  document
    .getElementById('toggle-foreground-btn')
    .addEventListener('click', ({ target }) => {
      foregroundCanvas.classList.toggle('hidden');
      if (foregroundCanvas.getAttribute('class').includes('hidden')) {
        target.innerText = 'Show foreground';
      } else {
        target.innerText = 'Hide foreground';
      }
    });

  document
    .getElementById('toggle-grid-btn')
    .addEventListener('click', ({ target }) => {
      gridCanvas.classList.toggle('hidden');
      if (gridCanvas.getAttribute('class').includes('hidden')) {
        target.innerText = 'Show grid';
      } else {
        target.innerText = 'Hide grid';
      }
    });

  document
    .getElementById('upload-files-form')
    .addEventListener('submit', uploadMaps);
});

window.addEventListener('beforeunload', () => {
  const {
    canvas: { maps },
  } = store.getState();
  localStorage.setItem('maps', JSON.stringify(maps));
});

const getCurrentElementOnClickHandler = (
  elementCanvas,
  store,
) => clickEvent => {
  const { x, y } = getMousePos(elementCanvas, clickEvent);
  const elementX = Math.floor(x / (backgroundTile.width * eCanvas.scale));
  const elementY = Math.floor(y / (backgroundTile.height * eCanvas.scale));
  const indexToTarget = elementY * eCanvas.elementPerRow + elementX;
  const [name, element] = Object.entries(backgroundTile.list)[indexToTarget];
  const {
    canvas: { selectedCanvas },
  } = store.getState();

  if (element) {
    switch (name) {
      case 'erase':
        switch (selectedCanvas) {
          case 'background':
            store.dispatch(setSelectedElement(null));
            break;
          case 'foreground':
            store.dispatch(setSelectedElement(backgroundTile.list.empty));
            break;
        }
        break;
      case 'start':
        // TODO set spawn point
        break;
      default:
        store.dispatch(setSelectedElement(element));
    }
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
