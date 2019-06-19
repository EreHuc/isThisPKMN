import {
  SetBackgroundContext,
  SetPlayerContext,
} from '../reducers/contexts.reducer';

export const setBackgroundContext = backgroundContext => ({
  type: SetBackgroundContext,
  payload: backgroundContext,
});

export const setPlayerContext = playerContext => ({
  type: SetPlayerContext,
  payload: playerContext,
});
