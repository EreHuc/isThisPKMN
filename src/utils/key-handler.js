import { keyCodes } from '../variables';

export const keyHandler = ({ onKeyDown, onKeyUp }) => {
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
      onKeyUp(oldKeyCode);

      if (currentKeyCode) {
        onKeyDown(currentKeyCode);
      }
    }
  });
};
