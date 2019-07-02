import { store } from '../store';
import { drawMap } from './draw';

function _animation(store, drawMap) {
  const step = timestamp => {
    drawMap();
    window.requestAnimationFrame(step);
  };

  const start = () => {
    window.requestAnimationFrame(step);
  };

  return {
    start,
  };
}

export const animation = _animation(store, drawMap);
