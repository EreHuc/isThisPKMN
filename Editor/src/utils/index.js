import { store } from '../store';
import { setMaps } from '../store/actions/canvas.actions';

export function _exportMaps(store) {
  return () => {
    const {
      canvas: {
        maps: { background, foreground },
      },
    } = store.getState();

    const downloadFile = (jsonObject, name) => {
      const dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(jsonObject, null, 4));
      const dlAnchorElement = document.getElementById('dl-a');
      dlAnchorElement.setAttribute('href', dataStr);
      dlAnchorElement.setAttribute('download', `${name}.json`);
      dlAnchorElement.click();
    };

    const downloadBackgroundMap = downloadFile(background, 'background');
    const downloadForegroundMap = downloadFile(foreground, 'foreground');

    return {
      downloadBackgroundMap,
      downloadForegroundMap,
    };
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
            background,
            foreground,
          }),
        );
      });
  };
}

export const uploadMaps = _uploadMaps(store);

export const exportMaps = _exportMaps(store);
