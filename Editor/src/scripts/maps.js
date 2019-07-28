import { store } from '../store';
import {
  initCanvas,
  setPlayerPositions,
} from '../store/actions/canvas.actions';

function _exportMaps(store) {
  return () => {
    const {
      canvas: {
        background,
        foreground,
        collision,
        movePoints,
        playerPositions: { x, y },
        size: { width, height },
      },
    } = store.getState();

    const name = prompt('Map name');

    const downloadFile = (tileList, name) => {
      const map = {
        ...tileList,
        startPosition: { x: x * 16, y: y * 16 },
        tilePerColumn: height,
        tilePerRow: width,
      };

      const dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(map, null, 4));
      const dlAnchorElement = document.getElementById('dl-a');
      dlAnchorElement.setAttribute('href', dataStr);
      dlAnchorElement.setAttribute('download', `${name}.json`);
      dlAnchorElement.click();
    };

    if (name && name.trim()) {
      downloadFile({ background, foreground, collision, movePoints }, name);
    }
  };
}

function _uploadMapsOld(store) {
  return submitEvent => {
    submitEvent.preventDefault();
    const {
      target: { background, foreground },
    } = submitEvent;

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
          initCanvas({
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

function _uploadMaps(store) {
  return submitEvent => {
    submitEvent.preventDefault();
    const {
      target: { map },
    } = submitEvent;

    const reader = new FileReader();

    new Promise(resolve => {
      reader.onload = ({ target: { result } }) => {
        resolve(JSON.parse(result));
      };
      if (map.files.length) {
        reader.readAsText(map.files[0]);
      } else {
        resolve(null);
      }
    }).then(
      ({ background, foreground, collision, startPosition, movePoints }) => {
        store.dispatch(
          initCanvas({
            background,
            foreground,
            collision,
            movePoints,
            startPosition,
          }),
        );
      },
    );
  };
}

function _resetMap(store) {
  return () => {
    store.dispatch(initCanvas({}));
  };
}

export const uploadMaps = _uploadMaps(store);

export const exportMaps = _exportMaps(store);

export const resetMap = _resetMap(store);
