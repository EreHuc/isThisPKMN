import { backgroundTile } from '../variables';
import { store } from '../store';
import { clearTile, setContextTransform } from './canvas';
import localState from './local-state';
import map from '../maps.js';
import { backgroundStep, drawBackground, initDrawBackground } from './map';
import { drawPlayer, playerStep } from './player';
import { keydownCallback, keyHandler, keyupCallback } from './key-handler';

const _animation = (
  store,
  localState,
  drawPlayer,
  drawBackground,
  clearTile,
  initDrawBackground,
  map,
  backgroundStep,
  keyHandler,
  keydownCallback,
  keyupCallback,
  playerStep,
  setContextTransform,
) => {
  const state = localState();
  const localKeyHandler = keyHandler({
    onKeyDown: keydownCallback(store),
    onKeyUp: keyupCallback(store),
  });

  const requestNextFrame = () => {
    const rafId = window.requestAnimationFrame(step);
    state.setLocalState({ rafId });
  };

  const step = timestamp => {
    const { contexts } = store.getState();

    Object.values(contexts).forEach(context => {
      clearTile({
        context,
        x: 0,
        y: 0,
        w: map.tilePerRow * backgroundTile.width,
        h: map.tilePerColumn * backgroundTile.height,
      });
    });

    backgroundStep(timestamp, state);
    playerStep(timestamp);
    setContextTransform();
    drawPlayer();
    drawBackground(state);
    requestNextFrame(state);
  };

  const start = () => {
    initDrawBackground(map, state);
    requestNextFrame(state);
    localKeyHandler.start();
  };

  const stop = () => {
    const { rafId } = state.getLocalState();
    localKeyHandler.stop();
    window.cancelAnimationFrame(rafId);
  };

  return {
    start,
    stop,
  };
};

export const animations = _animation(
  store,
  localState,
  drawPlayer,
  drawBackground,
  clearTile,
  initDrawBackground,
  map,
  backgroundStep,
  keyHandler,
  keydownCallback,
  keyupCallback,
  playerStep,
  setContextTransform,
);
