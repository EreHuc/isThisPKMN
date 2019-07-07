import { backgroundTile } from '../variables';
import { store } from '../store';
import { clearTile, setContextTransform } from './canvas';
import localState from './local-state';
import map from '../maps.js';
import { foregroundStep, drawForeground, initDrawForeground } from './map';
import { drawPlayer, playerStep } from './player';
import { keydownCallback, keyHandler, keyupCallback } from './key-handler';

const _animation = (
  store,
  localState,
  drawPlayer,
  drawForeground,
  clearTile,
  initDrawForeground,
  map,
  foregroundStep,
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
    const {
      contexts: { foreground, player, background },
    } = store.getState();

    Object.values({ foreground, player, background }).forEach(context => {
      clearTile({
        context,
        x: 0,
        y: 0,
        w: map.tilePerRow * backgroundTile.width,
        h: map.tilePerColumn * backgroundTile.height,
      });
    });

    foregroundStep(timestamp, state);
    playerStep(timestamp);
    setContextTransform();
    drawPlayer();
    drawForeground(state);
    requestNextFrame(state);
  };

  const start = () => {
    initDrawForeground(map, state);
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
  drawForeground,
  clearTile,
  initDrawForeground,
  map,
  foregroundStep,
  keyHandler,
  keydownCallback,
  keyupCallback,
  playerStep,
  setContextTransform,
);
