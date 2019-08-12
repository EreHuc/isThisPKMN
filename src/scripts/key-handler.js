import { keyCodes } from '../variables';
import {
  setPlayerDirection,
  setPlayerMovement,
} from '../store/actions/player.actions';

export const keyHandler = ({ onKeyDown, onKeyUp }) => {
  const localKeyState = (initialState = []) => {
    let state = [...initialState];

    return {
      addKeyCode: keyCode => {
        if (!state.find(code => code === keyCode)) {
          state = [...state, keyCode];
        }
      },
      removeKeyCode: keyCodes => {
        state = state.filter(element => element !== keyCodes);
      },
      getCurrentKeyCode: () => [...state],
    };
  };

  const state = localKeyState();

  const keyDownHandler = ({ code }) => {
    const [oldKeyCode] = state.getCurrentKeyCode();
    switch (code) {
      case keyCodes.up:
      case keyCodes.down:
      case keyCodes.left:
      case keyCodes.right:
        state.addKeyCode(code);
        break;
      default:
        break;
    }
    const [currentKeyCode] = state.getCurrentKeyCode();
    if (currentKeyCode !== oldKeyCode) {
      onKeyDown(currentKeyCode);
    }
  };

  const keyUpHandler = ({ code }) => {
    const [oldKeyCode] = state.getCurrentKeyCode();

    switch (code) {
      case keyCodes.up:
      case keyCodes.down:
      case keyCodes.left:
      case keyCodes.right:
        state.removeKeyCode(code);
        break;
      default:
        break;
    }

    const [currentKeyCode] = state.getCurrentKeyCode();
    if (currentKeyCode !== oldKeyCode) {
      if (currentKeyCode) {
        onKeyDown(currentKeyCode);
      } else {
        onKeyUp(oldKeyCode);
      }
    }
  };

  const start = () => {
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);
  };

  const stop = () => {
    window.removeEventListener('keydown', keyDownHandler);
    window.removeEventListener('keyup', keyUpHandler);
  };

  return {
    start,
    stop,
  };
};

export const keydownCallback = store => keyCode => {
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
};

export const keyupCallback = store => keyCode => {
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
};
