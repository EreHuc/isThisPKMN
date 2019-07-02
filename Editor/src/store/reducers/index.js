import { combineReducers } from 'redux';
import { contextsReducer } from './contexts.reducer';
import { imagesReducer } from './images.reducer';
import { canvasReducer } from './canvas.reducer';

export default combineReducers({
  contexts: contextsReducer,
  images: imagesReducer,
  canvas: canvasReducer,
});
