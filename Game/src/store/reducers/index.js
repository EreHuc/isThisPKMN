import { combineReducers } from 'redux';
import { playerReducer } from './player.reducer';
import { contextsReducer } from './contexts.reducer';
import { imagesReducer } from './images.reducer';
import { mapReducer } from './map.reducer';

export default combineReducers({
  player: playerReducer,
  contexts: contextsReducer,
  images: imagesReducer,
  map: mapReducer,
});
