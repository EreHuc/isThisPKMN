import {
  SetBackgroundContext,
  SetForegroundContext,
  SetPlayerContext,
} from '../reducers/contexts.reducer';

export const setForegroundContext = foregroundContext => ({
  type: SetForegroundContext,
  payload: foregroundContext,
});

export const setPlayerContext = playerContext => ({
  type: SetPlayerContext,
  payload: playerContext,
});

export const setBackgroundContext = backgroundContext => ({
  type: SetBackgroundContext,
  payload: backgroundContext,
});
