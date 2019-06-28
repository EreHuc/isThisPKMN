import { keyCodes } from '../variables';
import {
  setPlayerDirection,
  setPlayerMovement,
} from '../store/actions/player.actions';

export const keyHandler = ({ onKeyDown, onKeyUp }) => {
  const start = () => {
    const localKeyState = (initialState = []) => {
      let state = [...initialState];

      return {
        addKeyCode: keyCode => {
          if (state.indexOf(keyCode) === -1) {
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

    window.addEventListener('keydown', ({ code }) => {
      const [oldKeyCode] = state.getCurrentKeyCode();
      switch (code) {
        case keyCodes.up:
          state.addKeyCode(keyCodes.up);
          break;
        case keyCodes.down:
          state.addKeyCode(keyCodes.down);
          break;
        case keyCodes.left:
          state.addKeyCode(keyCodes.left);
          break;
        case keyCodes.right:
          state.addKeyCode(keyCodes.right);
          break;
        default:
          break;
      }
      const [currentKeyCode] = state.getCurrentKeyCode();
      if (currentKeyCode !== oldKeyCode) {
        onKeyDown(currentKeyCode);
      }
    });
    window.addEventListener('keyup', ({ code }) => {
      const [oldKeyCode] = state.getCurrentKeyCode();

      switch (code) {
        case keyCodes.up:
          state.removeKeyCode(keyCodes.up);
          break;
        case keyCodes.down:
          state.removeKeyCode(keyCodes.down);
          break;
        case keyCodes.left:
          state.removeKeyCode(keyCodes.left);
          break;
        case keyCodes.right:
          state.removeKeyCode(keyCodes.right);
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
    });
  };
  const stop = () => {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
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
      // moveUp();
      store.dispatch(setPlayerDirection(keyCodes.up));
      canMove = true;
      break;
    case keyCodes.down:
      // moveDown();
      store.dispatch(setPlayerDirection(keyCodes.down));
      canMove = true;
      break;
    case keyCodes.right:
      // moveRight();
      store.dispatch(setPlayerDirection(keyCodes.right));
      canMove = true;
      break;
    case keyCodes.left:
      // moveLeft();
      store.dispatch(setPlayerDirection(keyCodes.left));
      canMove = true;
      break;
    default:
      // eslint-disable-next-line no-console
      console.log('NOT HANDLED');
  }

  canMove && store.dispatch(setPlayerMovement(true));
};

export const keyupCallback = store => keyCode => {
  let canStop = false;
  switch (keyCode) {
    case keyCodes.up:
      canStop = true;
      break;
    case keyCodes.down:
      canStop = true;
      break;
    case keyCodes.right:
      canStop = true;
      break;
    case keyCodes.left:
      canStop = true;
      break;
    default:
      // eslint-disable-next-line no-console
      console.log('NOT HANDLED');
  }

  canStop && store.dispatch(setPlayerMovement(false));
};
