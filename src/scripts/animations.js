import { backgroundTile, MAP_STATUS_LOADING } from '../variables';
import { store } from '../store';
import { clearTile, setContextTransform } from './canvas';
import localState from './local-state';
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

  const requestNextFrame = state => {
    const rafId = window.requestAnimationFrame(step);
    state.setLocalState({ rafId });
  };

  const step = timestamp => {
    const {
      contexts: { foreground, player, background },
      map: { tilePerRow, tilePerColumn, status },
    } = store.getState();

    Object.values({ foreground, player, background }).forEach(context => {
      clearTile({
        context,
        x: 0,
        y: 0,
        w: tilePerRow * backgroundTile.width,
        h: tilePerColumn * backgroundTile.height,
      });
    });

    foregroundStep(timestamp, state);
    playerStep(timestamp);
    setContextTransform();
    drawPlayer();
    drawForeground(state);

    if (status !== MAP_STATUS_LOADING) {
      requestNextFrame(state);
    }
  };

  const start = () => {
    const {
      map: { foreground },
    } = store.getState();

    initDrawForeground(foreground, state);
    localKeyHandler.start();
    requestNextFrame(state);
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
  foregroundStep,
  keyHandler,
  keydownCallback,
  keyupCallback,
  playerStep,
  setContextTransform,
);
