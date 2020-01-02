import {
  getMapCurrentMovePoint,
  getMapMovePoints,
} from '../../store/selectors';
import maps from '../../maps';
import store, {
  setMap,
  setPlayerPosition,
  setPlayerTileId,
  setStatusPlaying,
} from '../../store';
import { tileToPosition } from './map.utils';
import { keyCodes, playerTile } from '../../variables';
import { setPlayerDirection } from '../../store/actions';

export function switchMap() {
  /*
    Get current teleport block that trigger switchMap ( may need some refacto )
    Get type, id and mapName of teleport block
    if type === in && mapName
      changeMapTo(maps[mapName])
    get move points
    find movePoint.id === id && movePoint.type !== type
    change playerPosition to movePoints positions or startPositions

    good map with good positions is loaded, restart playing
  */
  const { id, type, mapName } = getMapCurrentMovePoint() || {};

  if (type === 'in' && mapName) {
    store.dispatch(setMap(maps[mapName]));
  }

  const movePoints = getMapMovePoints() || [];
  const currentMovePointId =
    Object.entries(movePoints).reduce((acc, [key, movePoint]) => {
      if (movePoint.id === id && movePoint.type !== type) {
        acc = key;
      }

      return acc;
    }, '') || '';

  store.dispatch(
    setPlayerPosition(tileToPosition(...currentMovePointId.split(':'), 0, -4)),
  );

  store.dispatch(setPlayerDirection(keyCodes.down));

  store.dispatch(setPlayerTileId(playerTile.idle.down));

  window.setTimeout(() => {
    store.dispatch(setStatusPlaying());
  }, 400);
}
