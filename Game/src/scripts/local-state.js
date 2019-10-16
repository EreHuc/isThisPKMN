// TODO: Not use full anymore, to remove in Editor project then remove file
export default function localState(state = {}) {
  let localState = { ...state };

  return {
    getLocalState: () => ({
      ...localState,
    }),
    // dangerous method, can easily throw err
    setLocalState: newState => {
      localState = {
        ...localState,
        ...newState,
      };
    },
  };
}
