import { getMapScale } from '../store/selectors';
import store, { setScale } from '../store';

export default function handleMapScale() {
  document.getElementById('down-scale').addEventListener('click', () => {
    const scale = getMapScale();

    store.dispatch(setScale(scale - 1));
  });
  document.getElementById('up-scale').addEventListener('click', () => {
    const scale = getMapScale();

    store.dispatch(setScale(scale + 1));
  });
}
