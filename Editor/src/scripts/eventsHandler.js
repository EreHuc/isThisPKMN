import { backgroundTile, elementCanvas as eCanvas } from '../variables';
import {
  setBackgroundMap,
  setEraseMap,
  setForegroundMap,
  setCollisionMap,
  setPlayerPositions,
  setSelectedCanvas,
  setSelectedElement,
  setSelectedElementPositions,
  removeMovePoint,
  setMoveIn,
  setMoveOut,
} from '../store/actions/canvas.actions';
import localState from '../../../Game/src/scripts/local-state';
import { store } from '../store';
import { createDialog } from './dialog';

export function getCurrentElementOnClickHandler(canvasDomElement, store) {
  return clickEvent => {
    const { x, y } = getMousePos(canvasDomElement, clickEvent);
    const elementX = Math.floor(x / (backgroundTile.width * eCanvas.scale));
    const elementY = Math.floor(y / (backgroundTile.height * eCanvas.scale));
    const indexToTarget = elementY * eCanvas.elementPerRow + elementX;
    const element = Object.values(backgroundTile.list)[indexToTarget];

    if (element) {
      store.dispatch(setSelectedElementPositions(elementX, elementY));
      store.dispatch(setSelectedElement(element));
    }
  };
}

export function setCurrentElementOnClickHandler(backgroundCanvas, store) {
  return async clickEvent => {
    clickEvent.stopPropagation();
    const {
      canvas: { selectedElement, selectedCanvas },
    } = store.getState();

    const { x, y } = getMousePos(backgroundCanvas, clickEvent);
    const backgroundX = Math.floor(x / (backgroundTile.width * eCanvas.scale));
    const backgroundY = Math.floor(y / (backgroundTile.height * eCanvas.scale));
    const { id, ids, layer } = selectedElement || {};

    if (id !== undefined || ids !== undefined) {
      switch (id) {
        case backgroundTile.list.start.id:
          store.dispatch(setPlayerPositions(backgroundX, backgroundY));
          break;
        case backgroundTile.list.erase.id:
          store.dispatch(setEraseMap(backgroundX, backgroundY, selectedCanvas));
          if (selectedCanvas === 'collision') {
            store.dispatch(removeMovePoint(backgroundX, backgroundY));
          }
          break;
        case backgroundTile.list.changeMap:
          break;
        case backgroundTile.list.portalIn.id:
          if (selectedCanvas === 'collision') {
            try {
              const { id, mapName } = await createDialog('Teleport entrance');

              store.dispatch(setMoveIn(backgroundX, backgroundY, id, mapName));
              store.dispatch(setCollisionMap(backgroundX, backgroundY, layer));
            } catch (_) {
              // dialog closed
            }
          }
          break;
        case backgroundTile.list.portalOut.id:
          if (selectedCanvas === 'collision') {
            try {
              const { id, mapName } = await createDialog('Teleport exit');

              store.dispatch(setMoveOut(backgroundX, backgroundY, id, mapName));
              store.dispatch(setCollisionMap(backgroundX, backgroundY, layer));
            } catch (_) {
              // dialog closed
            }
          }
          break;
        default:
          switch (selectedCanvas) {
            case 'background':
              store.dispatch(
                setBackgroundMap(backgroundX, backgroundY, { id, ids }),
              );
              break;
            case 'foreground':
              store.dispatch(
                setForegroundMap(backgroundX, backgroundY, { id, ids }),
              );
              store.dispatch(setCollisionMap(backgroundX, backgroundY, layer));
              break;
            case 'collision':
              store.dispatch(setCollisionMap(backgroundX, backgroundY, layer));
          }
      }
    }
  };
}

export function switchBackgroundForegroundHandler(store) {
  return ({ target }) => {
    const { innerText } = target;
    if (innerText.toLowerCase().includes('background')) {
      store.dispatch(setSelectedCanvas('foreground'));
      target.innerText = 'Foreground';
    } else {
      store.dispatch(setSelectedCanvas('background'));
      target.innerText = 'Background';
    }
    target.classList.toggle('active');
  };
}

export function _toggleCollisionHandler(localState, store) {
  const currentState = localState({ selectedCanvas: 'background' });

  return ({ target }) => {
    const {
      canvas: { selectedCanvas },
    } = store.getState();
    const {
      selectedCanvas: previousSelectedCanvas,
    } = currentState.getLocalState();
    const layerCanvas = document.getElementById('collision-canvas');
    const canvasToggleBtn = document.getElementById('canvas-btn');
    const { innerText } = target;

    if (innerText.toLowerCase().includes('show')) {
      target.innerText = 'HIDE COLLISION';
      store.dispatch(setSelectedCanvas('collision'));
      currentState.setLocalState({ selectedCanvas });
      canvasToggleBtn.setAttribute('disabled', 'true');
    } else {
      target.innerText = 'SHOW COLLISION';
      store.dispatch(setSelectedCanvas(previousSelectedCanvas));
      canvasToggleBtn.removeAttribute('disabled');
    }

    layerCanvas.classList.toggle('hidden');
  };
}

function getMousePos(canvas, mouseEvent) {
  const { left, top } = canvas.getBoundingClientRect();

  return {
    x: mouseEvent.clientX - (left / 2),
    y: mouseEvent.clientY - (top / 2),
  };
}

function toggleElement(elementName) {
  return domElement => {
    return ({ target }) => {
      domElement.classList.toggle('hidden');

      target.innerText = domElement.getAttribute('class').includes('hidden')
        ? `Show ${elementName}`
        : `Hide ${elementName}`;
    };
  };
}

export const toggleGridHandler = toggleElement('grid');

export const toggleForegroundHandler = toggleElement('foreground');

export const toggleBackgroundHandler = toggleElement('background');

export const toggleCollisionHandler = _toggleCollisionHandler(
  localState,
  store,
);
