import { initGame } from './engine';
import { store } from './store';
// import { setPlayerCurrentImage } from './store/actions/player.actions';

window.addEventListener('DOMContentLoaded', () => {
  initGame(store);

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
