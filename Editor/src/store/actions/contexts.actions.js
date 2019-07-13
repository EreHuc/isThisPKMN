import {
  SetBackgroundContext,
  SetBackgroundGridContext,
  SetElementsContext,
  SetElementsGridContext,
  SetForegroundContext,
  SetElementsSelectorContext, SetLayerContext,
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

export const setElementsSelectorContext = elementsSelectorContext => ({
  type: SetElementsSelectorContext,
  payload: elementsSelectorContext,
});

export const setLayerContext = layerContext => ({
  type: SetLayerContext,
  payload: layerContext,
});
