import { createSelector } from './index';

export const getImagesPlayer = createSelector(state => state.images.player);

export const getImagesBackground = createSelector(
  state => state.images.background,
);
