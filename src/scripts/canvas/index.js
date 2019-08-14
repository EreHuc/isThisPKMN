import { createCanvas } from './canvas.create';

export * from './canvas.create';
export * from './canvas.transform';
export * from './canvas.utils';
export const createBackgroundCanvas = createCanvas({
  id: 'canvas_background',
  containerElement: document.getElementById('gbc-canvas'),
});
export const createForegroundCanvas = createCanvas({
  id: 'canvas_foreground',
  containerElement: document.getElementById('gbc-canvas'),
});
export const createPlayerCanvas = createCanvas({
  id: 'canvas_player',
  containerElement: document.getElementById('gbc-canvas'),
});
