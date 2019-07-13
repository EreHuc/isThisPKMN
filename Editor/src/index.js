import { createCanvas } from '../../src/utils/canvas';
import {
  backgroundCanvas as bCanvas,
  elementCanvas as eCanvas,
} from './variables';
import { drawElementList } from './utils/draw';
import { backgroundTile } from './variables';
import { store } from './store';
import { setBackgroundImage } from './store/actions/images.actions';
import {
  setBackgroundContext,
  setBackgroundGridContext,
  setElementsContext,
  setElementsGridContext,
  setElementsSelectorContext,
  setForegroundContext,
  setLayerContext,
} from './store/actions/contexts.actions';
import {
  setBackgroundMap,
  setForegroundMap,
  setLayerMap,
  setMaps,
  setPlayerPositions,
  setSelectedCanvas,
  setSelectedElement,
  setSelectedElementPositions,
} from './store/actions/canvas.actions';
import { animation } from './utils/animations';
import { exportMaps, uploadMaps } from './utils';

window.addEventListener('DOMContentLoaded', () => {
  const elementContext = createCanvas({
    id: 'elements-canvas',
    containerElement: document.getElementById('canvas-element-container'),
    height: eCanvas.height,
    width: eCanvas.width,
    scale: 1,
  })();

  const layerContext = createCanvas({
    id: 'layer-canvas',
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

  const oldMaps = JSON.parse(localStorage.getItem('maps'));
  const oldPlayerPositions = JSON.parse(
    localStorage.getItem('playerPositions'),
  );

  oldMaps && oldMaps.background && store.dispatch(setMaps(oldMaps));

  oldPlayerPositions &&
    store.dispatch(
      setPlayerPositions(oldPlayerPositions.x, oldPlayerPositions.y),
    );

  elementContext.scale(eCanvas.scale, eCanvas.scale);
  foregroundContext.scale(eCanvas.scale, eCanvas.scale);
  backgroundContext.scale(bCanvas.scale, bCanvas.scale);
  elementsSelectorContext.lineWidth = 2;
  elementsSelectorContext.lineJoin = 'bevel';
  layerContext.lineWidth = 2;
  layerContext.lineJoin = 'bevel';

  store.dispatch(setBackgroundContext(backgroundContext));
  store.dispatch(setForegroundContext(foregroundContext));
  store.dispatch(setElementsContext(elementContext));
  store.dispatch(setBackgroundGridContext(backgroundGridContext));
  store.dispatch(setElementsGridContext(elementsGridContext));
  store.dispatch(setElementsSelectorContext(elementsSelectorContext));
  store.dispatch(setLayerContext(layerContext));

  const elementCanvas = document.getElementById('elements-canvas');
  const elementGridCanvas = document.getElementById('elements-grid-canvas');
  const backgroundCanvas = document.getElementById('background-canvas');
  const foregroundCanvas = document.getElementById('foreground-canvas');
  const layerCanvas = document.getElementById('layer-canvas');
  const gridCanvas = document.getElementById('background-grid-canvas');
  const switchCanvas = document.getElementById('canvas-btn');
  const switchCanvasLayer = document.getElementById('layer-btn');

  elementGridCanvas.addEventListener(
    'click',
    getCurrentElementOnClickHandler(elementCanvas, store),
  );

  gridCanvas.addEventListener(
    'click',
    setCurrentElementOnClickHandler(backgroundCanvas, store),
  );

  layerCanvas.addEventListener('click', clickEvent => {
    const { canvas } = store.getState();
    setCurrentElementOnClickHandler(layerCanvas, {
      getState: () => ({ canvas: { ...canvas, selectedCanvas: 'layer' } }),
      dispatch: store.dispatch,
    })(clickEvent);
  });

  switchCanvas.addEventListener('click', ({ target }) => {
    const { innerText } = target;
    if (innerText.toLowerCase().includes('background')) {
      store.dispatch(setSelectedCanvas('foreground'));
      target.innerText = 'Foreground';
    } else {
      store.dispatch(setSelectedCanvas('background'));
      target.innerText = 'Background';
    }
    target.classList.toggle('active');
  });

  switchCanvasLayer.addEventListener('click', ({ target }) => {
    const { innerText } = target;
    if (innerText.toLowerCase().includes('show')) {
      target.innerText = 'HIDE COLLISION';
    } else {
      target.innerText = 'SHOW COLLISION';
    }
    layerCanvas.classList.toggle('hidden');
  });

  loadBackground.then(backgroundImg => {
    store.dispatch(setBackgroundImage(backgroundImg));
    drawElementList(elementContext, backgroundImg);
    animation.start();
  });

  document.getElementById('dl-btn').addEventListener('click', exportMaps);
  document.getElementById('reset-map-btn').addEventListener('click', () => {
    store.dispatch(setMaps({}));
    store.dispatch(setPlayerPositions(null, null));
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
    canvas: { background, foreground, layer, playerPositions },
  } = store.getState();
  localStorage.setItem(
    'maps',
    JSON.stringify({ background, foreground, layer }),
  );
  localStorage.setItem('playerPositions', JSON.stringify(playerPositions));
});

const getCurrentElementOnClickHandler = (
  elementCanvas,
  store,
) => clickEvent => {
  const { x, y } = getMousePos(elementCanvas, clickEvent);
  const elementX = Math.floor(x / (backgroundTile.width * eCanvas.scale));
  const elementY = Math.floor(y / (backgroundTile.height * eCanvas.scale));
  const indexToTarget = elementY * eCanvas.elementPerRow + elementX;
  const [name, element] =
    Object.entries(backgroundTile.list)[indexToTarget] || [];

  if (element) {
    switch (name) {
      case 'erase':
        store.dispatch(setSelectedElement(backgroundTile.list.empty));
        break;
      case 'start':
        store.dispatch(setSelectedElement(backgroundTile.list.start));
        break;
      default:
        store.dispatch(setSelectedElement(element));
    }
    store.dispatch(setSelectedElementPositions(elementX, elementY));
  }
};

const setCurrentElementOnClickHandler = (
  backgroundCanvas,
  store,
) => clickEvent => {
  clickEvent.stopPropagation();
  const {
    canvas: { selectedElement, selectedCanvas },
  } = store.getState();

  const { x, y } = getMousePos(backgroundCanvas, clickEvent);
  const backgroundX = Math.floor(x / (backgroundTile.width * eCanvas.scale));
  const backgroundY = Math.floor(y / (backgroundTile.height * eCanvas.scale));

  if (selectedElement && selectedElement.id === backgroundTile.list.start.id) {
    store.dispatch(setPlayerPositions(backgroundX, backgroundY));
  } else {
    const { id, ids, layer } = selectedElement;
    switch (selectedCanvas) {
      case 'background':
        store.dispatch(setBackgroundMap(backgroundX, backgroundY, { id, ids }));
        break;
      case 'foreground':
        store.dispatch(setForegroundMap(backgroundX, backgroundY, { id, ids }));
        store.dispatch(setLayerMap(backgroundX, backgroundY, layer));
        break;
      case 'layer':
        store.dispatch(setLayerMap(backgroundX, backgroundY, layer));
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
