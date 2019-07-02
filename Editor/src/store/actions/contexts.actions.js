import {
  SetBackgroundContext,
  SetElementsContext,
} from '../reducers/contexts.reducer';

export const setBackgroundContext = backgroundContext => ({
  type: SetBackgroundContext,
  payload: backgroundContext,
});

export const setElementsContext = elementsContext => ({
  type: SetElementsContext,
  payload: elementsContext,
});
