import {
  SetBackgroundContext,
  SetBackgroundGridContext,
  SetElementsContext,
  SetElementsGridContext,
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

export const setBackgroundGridContext = backgroundGridContext => ({
  type: SetBackgroundGridContext,
  payload: backgroundGridContext,
});

export const setElementsGridContext = elementsGridContext => ({
  type: SetElementsGridContext,
  payload: elementsGridContext,
});
