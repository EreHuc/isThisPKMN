import { backgroundTile, MAP_STATUS_LOADING } from '../variables';
import {
  getContextBackground,
  getContextForeground,
  getContextPlayer,
  getMapForeground,
  getMapStatus,
  getMapTilePerColumn,
  getMapTilePerRow,
} from '../store';
import { clearTile, setContextTransform } from './canvas';
import {
  foregroundStep,
  drawForeground,
  init as initForeground,
  drawBackground,
} from './map';
import { drawPlayer, playerStep } from './player';
import { keydownCallback, keyHandler, keyupCallback } from './keyboard';

const _animation = () => {
  let rafId;

  const localKeyHandler = keyHandler({
    onKeyDown: keydownCallback,
    onKeyUp: keyupCallback,
  });

  const requestNextFrame = (animatedTiles, idleTiles) => {
    rafId = window.requestAnimationFrame(step(animatedTiles, idleTiles));
  };

  const step = (animatedTiles, idleTiles) => {
    return timestamp => {
      const foreground = getContextForeground();
      const player = getContextPlayer();
      const background = getContextBackground();
      const tilePerRow = getMapTilePerRow();
      const tilePerColumn = getMapTilePerColumn();
      const status = getMapStatus();

      Object.values({ foreground, player, background }).forEach(context => {
        clearTile({
          context,
          x: 0,
          y: 0,
          w: tilePerRow * backgroundTile.width,
          h: tilePerColumn * backgroundTile.height,
        });
      });
      const tileAnimationIndex = foregroundStep(timestamp, animatedTiles);
      playerStep(timestamp);
      setContextTransform();
      drawPlayer();
      drawForeground(animatedTiles, idleTiles, tileAnimationIndex);
      drawBackground();

      if (status !== MAP_STATUS_LOADING) {
        requestNextFrame(animatedTiles, idleTiles);
      }
    };
  };

  const start = () => {
    const foreground = getMapForeground();

    const [animatedTiles, idleTiles] = initForeground(foreground);
    localKeyHandler.start();
    requestNextFrame(animatedTiles, idleTiles);
  };

  const stop = () => {
    localKeyHandler.stop();
    window.cancelAnimationFrame(rafId);
  };

  return {
    start,
    stop,
  };
};

export const animations = _animation();
