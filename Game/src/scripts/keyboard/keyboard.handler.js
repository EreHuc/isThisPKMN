import { keyCodes } from '../../variables';
import { localKeyState } from './keyboard.utils';

function _keyHandler() {
  const state = localKeyState();

  return ({ onKeyDown, onKeyUp }) => {
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
}

export const keyHandler = _keyHandler();
