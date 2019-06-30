import { initGame } from './engine';
import { store } from './store';
import { setPlayerCurrentImage } from './store/actions/player.actions';

window.addEventListener('DOMContentLoaded', () => {
  initGame(store);
  selectCharacter(store);
  handleSize();
});

function handleSize() {
  const resizeEventHandler = () => {
    const gbcContainer = document.getElementById('gbc-container');
    const {
      offsetHeight: gbcScreenH,
      offsetWidth: gbcScreenW,
    } = document.getElementById('gbc-screen');
    const { offsetHeight: bodyH, offsetWidth: bodyW } = document.body;

    const scaleH = (Number(bodyH) * 0.83) / Number(gbcScreenH);
    const scaleW = (Number(bodyW) * 0.75) / Number(gbcScreenW);

    const scale = Math.min(scaleH, scaleW);

    gbcContainer.setAttribute('style', `transform: scale(${scale});`);
  };

  window.addEventListener('resize', resizeEventHandler);

  resizeEventHandler();
}

function selectCharacter(store) {
  let sprites = [];

  document.querySelector('#select-label').addEventListener('click', () => {
    document.querySelector('#select-container').classList.toggle('active');
  });

  store.subscribe(() => {
    const container = document.querySelector('[data-tag="select-sprites"]');
    const { images } = store.getState();
    const imagesList = Object.entries(images);

    if (imagesList.length !== sprites.length) {
      container.innerHTML = '';

      imagesList.forEach(([spriteName, spriteImage]) => {
        const divElement = document.createElement('div');
        divElement.innerText = spriteName;
        divElement.addEventListener('click', () => {
          store.dispatch(setPlayerCurrentImage(spriteImage));
          document
            .querySelector('#select-container')
            .classList.toggle('active');
        });
        container.appendChild(divElement);
      });

      sprites = [...imagesList];
    }
  });
}
