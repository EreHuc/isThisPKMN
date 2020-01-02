import store, { setPlayerCurrentImage } from '../store';

/**
 * Handle change of sprite in UI
 */
export default function selectCharacterHandler() {
  let sprites = [];
  const container = document.querySelector('[data-tag="select-sprites"]');

  document.querySelector('#select-label').addEventListener('click', () => {
    document.querySelector('#select-container').classList.toggle('active');
  });

  container.addEventListener('click', () => {
    document.querySelector('#select-container').classList.remove('active');
  });

  store.subscribe(() => {
    const { images } = store.getState();
    const imagesList = Object.entries(images);

    if (imagesList.length !== sprites.length) {
      container.innerHTML = '';

      imagesList.forEach(([spriteName, spriteImage]) => {
        if (spriteName !== 'background') {
          const divElement = document.createElement('div');
          divElement.innerText = spriteName;
          divElement.addEventListener('click', () => {
            store.dispatch(setPlayerCurrentImage(spriteImage));
            document
              .querySelector('#select-container')
              .classList.toggle('active');
          });
          container.appendChild(divElement);
        }
      });

      sprites = [...imagesList];
    }
  });
}
