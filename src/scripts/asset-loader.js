import { backgroundTile, playerTile } from '../variables';

function loadImage(src) {
  return new Promise(resolve => {
    const image = new Image();
    image.onload = loadEvent => {
      resolve(loadEvent.target);
    };
    image.src = src;
  });
}

export const loadBackground = loadImage(backgroundTile.src);
export const loadPlayer = loadImage(playerTile.src);
export const loadPikachu = loadImage(playerTile.pikachuSrc);
export const loadPkmn = loadImage(playerTile.pkmnSrc);
export const loadMelofee = loadImage(playerTile.melofeeSrc);
export const loadJessie = loadImage(playerTile.jessieSrc);
export const loadJames = loadImage(playerTile.jamesSrc);
