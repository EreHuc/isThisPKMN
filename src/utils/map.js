import { backgroundTile } from '../variables';
import { clearTile, drawTile } from './canvas';
import localState from './local-state';

const _drawMap = (drawTile, clearTile, localState) => {
  const state = localState();

  return ({ map, context, backgroundImg }) => {
    const step = timestamp => {
      const {
        start = 0,
        animatedTiles,
        animatedTileIndex = 0,
        animationDirection = 1,
      } = state.getLocalState();

      if (timestamp - start > 300) {
        let tileIndex;

        switch (animationDirection) {
          case 1:
            if (animatedTileIndex === animatedTiles[0].ids.length - 1) {
              tileIndex = animatedTileIndex;

              state.setLocalState({
                animationDirection: -animationDirection,
              });
            } else {
              tileIndex = animatedTileIndex + animationDirection;
            }
            break;
          case -1:
            if (animatedTileIndex === 0) {
              tileIndex = animatedTileIndex;

              state.setLocalState({
                animationDirection: -animationDirection,
              });
            } else {
              tileIndex = animatedTileIndex + animationDirection;
            }
            break;
        }

        state.setLocalState({
          animatedTileIndex: tileIndex,
        });

        animatedTiles.forEach(animatedTile => {
          const tileId = animatedTile.ids[tileIndex];

          clearTile({
            context,
            x: animatedTile.xDest,
            y: animatedTile.yDest,
            w: backgroundTile.width,
            h: backgroundTile.height,
          });

          drawTile({
            tile: backgroundTile,
            tileImg: backgroundImg,
            tileId,
            context,
            xDest: animatedTile.xDest,
            yDest: animatedTile.yDest,
          });
        });

        state.setLocalState({
          start: timestamp,
        });
      }

      window.requestAnimationFrame(step);
    };

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const { id, ids } = map[y][x];
        const {
          animatedTiles = [],
          animatedTileIndex = 0,
        } = state.getLocalState();
        const xDest = x * backgroundTile.width;
        const yDest = y * backgroundTile.height;

        drawTile({
          tile: backgroundTile,
          tileImg: backgroundImg,
          tileId: id === undefined ? ids[animatedTileIndex] : id,
          context,
          xDest,
          yDest,
        });

        if (id === undefined) {
          state.setLocalState({
            animatedTiles: [...animatedTiles, { ids, xDest, yDest }],
          });
        }
      }
    }

    window.requestAnimationFrame(step);
  };
};

export const drawMap = _drawMap(drawTile, clearTile, localState);
