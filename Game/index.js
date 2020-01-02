import { initEngine } from './src/engine';
import handleCanvasSize from './src/UI/handle-canvas-size';
import selectCharacterHandler from './src/UI/select-alt-char';

window.addEventListener('DOMContentLoaded', () => {
  initEngine();

  selectCharacterHandler();
  handleCanvasSize();
});
