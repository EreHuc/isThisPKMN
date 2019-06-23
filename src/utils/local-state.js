export default function localState(state = {}) {
  let localState = { ...state };

  return {
    getLocalState: () => ({
      ...localState,
    }),
    setLocalState: newState => {
      localState = {
        ...localState,
        ...newState,
      };
    },
  };
}
