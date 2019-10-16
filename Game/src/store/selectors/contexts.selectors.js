import { createSelector } from './index';

export const getContextPlayer = createSelector(state => state.contexts.player);

export const getContextForeground = createSelector(
  state => state.contexts.foreground,
);

export const getContextBackground = createSelector(
  state => state.contexts.background,
);
