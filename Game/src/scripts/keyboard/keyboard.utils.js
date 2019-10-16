export function localKeyState(initialState = []) {
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
}
