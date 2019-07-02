import {
  SetBackgroundContext,
  SetElementsContext,
  SetForegroundContext,
} from '../reducers/contexts.reducer';

export const setBackgroundContext = backgroundContext => ({
  type: SetBackgroundContext,
  payload: backgroundContext,
});

export const setForegroundContext = foregroundContext => ({
  type: SetForegroundContext,
  payload: foregroundContext,
});

export const setElementsContext = elementsContext => ({
  type: SetElementsContext,
  payload: elementsContext,
});
