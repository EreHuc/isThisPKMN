import { canvas, playerTile } from '../../variables';
import store, { getMapScale, getPlayerPositions } from '../../store';

/**
 * Apply transform to center camera around player to chosen context
 * @param x
 * @param y
 * @param context
 * @param scale
 * @param width
 * @param height
 */
function setTransform(
  x,
  y,
  context,
  scale = canvas.scale,
  width = canvas.width,
  height = canvas.height,
) {
  context.setTransform(
    scale,
    0,
    0,
    scale,
    -scale * (x - width / (2 * scale) + playerTile.width / 2),
    -scale * (y - height / (2 * scale) + playerTile.height / 2),
  );
}

/**
 * Apply setTransform to all context
 */
export function setContextTransform() {
  const { contexts } = store.getState();
  const { x, y } = getPlayerPositions();
  const scale = getMapScale() || canvas.scale;

  Object.values(contexts).forEach(context => {
    setTransform(x, y, context, scale);
  });
}
