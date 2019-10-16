import store, { setPlayerDirection, setPlayerMovement } from '../../store';
import { keyCodes } from '../../variables';

export function keydownCallback(keyCode) {
  let canMove = false;
  switch (keyCode) {
    case keyCodes.up:
    case keyCodes.down:
    case keyCodes.right:
    case keyCodes.left:
      store.dispatch(setPlayerDirection(keyCode));
      canMove = true;
      break;
    default:
      // eslint-disable-next-line no-console
      console.warn('Key code not handled');
  }

  canMove && store.dispatch(setPlayerMovement(true));
}

export function keyupCallback(keyCode) {
  let canStop = false;
  switch (keyCode) {
    case keyCodes.up:
    case keyCodes.down:
    case keyCodes.right:
    case keyCodes.left:
      canStop = true;
      break;
    default:
      // eslint-disable-next-line no-console
      console.warn('Key code not handled');
  }

  canStop && store.dispatch(setPlayerMovement(false));
}
