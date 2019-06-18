import { combineReducers } from 'redux';
import { playerReducer } from './player.reducers';

export default combineReducers({
  player: playerReducer,
});
