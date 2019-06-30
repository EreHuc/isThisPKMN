import { initGame } from './engine';
import { store } from './store';
// import { setPlayerCurrentImage } from './store/actions/player.actions';

window.addEventListener('DOMContentLoaded', () => {
  initGame(store);

  const handleSize = () => {
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

  window.addEventListener('resize', handleSize);
  handleSize();

  // let sprites = [];
  // store.subscribe(() => {
  //   const { images } = store.getState();
  //   const imagesList = Object.entries(images);
  //
  //   if (imagesList.length !== sprites.length) {
  //     sprites = [...imagesList];
  //     document.getElementById('select_sprites').innerHTML = sprites
  //       .map(([spriteName]) => {
  //         return `<option value="${spriteName}">${spriteName}</option>`;
  //       })
  //       .join('\n');
  //   }
  // });
  // document
  //   .getElementById('select_sprites')
  //   .addEventListener('change', ({ target: { value } }) => {
  //     store.dispatch(
  //       setPlayerCurrentImage(
  //         sprites.find(([spriteName]) => spriteName === value)[1],
  //       ),
  //     );
  //   });
});
