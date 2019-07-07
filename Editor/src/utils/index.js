import { store } from '../store';
import { setMaps, setPlayerPositions } from '../store/actions/canvas.actions';
import { backgroundTile } from '../variables';

export function _exportMaps(store) {
  return () => {
    const {
      canvas: {
        maps: { background, foreground },
        playerPositions: { x, y },
        size: { width, height },
      },
    } = store.getState();

    const name = prompt('Map name');

    const downloadFile = (tileList, type, name) => {
      const map = {
        tileList,
        startPosition: { x: x * 16, y: y * 16 },
        tilePerColumn: height,
        tilePerRow: width,
      };

      const dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(map, null, 4));
      const dlAnchorElement = document.getElementById('dl-a');
      dlAnchorElement.setAttribute('href', dataStr);
      dlAnchorElement.setAttribute('download', `${name}_${type}.json`);
      dlAnchorElement.click();
    };

    if (name && name.trim()) {
      downloadFile(background, 'background', name);
      downloadFile(foreground, 'foreground', name);
    }
  };
}

export function _uploadMaps(store) {
  return submitEvent => {
    submitEvent.preventDefault();
    const {
      target: { background, foreground },
    } = submitEvent;

    // [...background.files[0], ...foreground.files[0]];
    const reader = new FileReader();

    new Promise(resolve => {
      reader.onload = ({ target: { result } }) => {
        resolve(JSON.parse(result));
      };
      if (background.files.length) {
        reader.readAsText(background.files[0]);
      } else {
        resolve(null);
      }
    })
      .then(backgroundResult => {
        return new Promise(resolve => {
          reader.onload = ({ target: { result } }) => {
            resolve([backgroundResult, JSON.parse(result)]);
          };
          if (foreground.files.length) {
            reader.readAsText(foreground.files[0]);
          } else {
            resolve([backgroundResult, null]);
          }
        });
      })
      .then(([background, foreground]) => {
        store.dispatch(
          setMaps({
            background: background.tileList,
            foreground: foreground.tileList,
          }),
        );
        store.dispatch(
          setPlayerPositions(
            background.startPosition.x,
            background.startPosition.y,
          ),
        );
      });
  };
}

export const uploadMaps = _uploadMaps(store);

export const exportMaps = _exportMaps(store);
