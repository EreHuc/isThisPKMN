import { initGame } from './engine';
import { store } from './store';

// var key, wall, animation = 0, tempo = 100, distance=16, anim = 1, x = 32, y = 26;

window.addEventListener('DOMContentLoaded', () => {
  initGame(store);
});
