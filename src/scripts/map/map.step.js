function _foregroundStep() {
  let start = 0;
  let animatedTilesIndex = 0;
  let direction = 1;

  return (timestamp, animatedTiles) => {
    if (animatedTiles.length && timestamp - start > 300) {
      switch (direction) {
        case 1:
          if (animatedTilesIndex === animatedTiles[0].ids.length - 1) {
            direction = -direction;
          } else {
            animatedTilesIndex = animatedTilesIndex + direction;
          }
          break;
        case -1:
          if (animatedTilesIndex === 0) {
            direction = -direction;
          } else {
            animatedTilesIndex = animatedTilesIndex + direction;
          }
          break;
      }

      start = timestamp;
    }

    return animatedTilesIndex;
  };
}

export const foregroundStep = _foregroundStep();
