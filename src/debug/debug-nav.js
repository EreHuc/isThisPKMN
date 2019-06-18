import { store } from '../store';
import {
  setDirection,
  setFilters,
  setSpriteSrc,
} from '../store/actions/player.actions';
import { playerTile } from '../constant';

class DebugNav extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    const navToggle = document.createElement('button');
    const container = document.createElement('div');
    const sliderFilterContainer = document.createElement('div');
    const sliderFilterLabel = document.createElement('label');
    const sliderFilter = document.createElement('input');
    const spriteSelector = document.createElement('select');
    const spriteSelectorLabel = document.createElement('label');
    const spriteSelectorContainer = document.createElement('div');
    const directionSelector = document.createElement('select');
    const directionSelectorLabel = document.createElement('label');
    const directionSelectorContainer = document.createElement('div');

    container.setAttribute('id', 'debug-nav-container');

    navToggle.setAttribute('id', 'debug-nav-toggle');
    navToggle.setAttribute('type', 'button');
    navToggle.innerText = 'SHOW';

    sliderFilter.setAttribute('id', 'debug-filter');
    sliderFilter.setAttribute('type', 'range');
    sliderFilter.setAttribute('min', '0');
    sliderFilter.setAttribute('max', '360');

    sliderFilterLabel.setAttribute('for', 'debug-filter');
    sliderFilterLabel.innerText = 'Filter value';

    sliderFilterContainer.appendChild(sliderFilterLabel);
    sliderFilterContainer.appendChild(sliderFilter);

    directionSelector.setAttribute('id', 'debug-direction');
    directionSelector.innerHTML = [0, 1, 2, 3, 4, 5, 6, 7, 9, 10]
      .map(direction => `<option value="${direction}">${direction}</option>`)
      .join('\n');

    directionSelectorLabel.setAttribute('for', 'debug-direction');
    directionSelectorLabel.innerText = 'Direction';

    directionSelectorContainer.appendChild(directionSelectorLabel);
    directionSelectorContainer.appendChild(directionSelector);

    spriteSelector.setAttribute('id', 'debug-sprite');
    spriteSelector.innerHTML = ['sacha', 'pikachu']
      .map(spriteName => `<option value="${spriteName}">${spriteName}</option>`)
      .join('\n');

    spriteSelectorLabel.setAttribute('for', 'debug-sprite');
    spriteSelectorLabel.innerText = 'Sprite';

    spriteSelectorContainer.appendChild(spriteSelectorLabel);
    spriteSelectorContainer.appendChild(spriteSelector);

    // LISTENERS
    navToggle.addEventListener('click', () => {
      {
        if (navToggle.innerText === 'SHOW') {
          navToggle.innerText = 'HIDE';
          container.classList.add('active');
        } else {
          navToggle.innerText = 'SHOW';
          container.classList.remove('active');
        }
      }
    });
    sliderFilter.addEventListener('input', ({ target }) => {
      store.dispatch(setFilters(`hue-rotate(${target.value}deg)`));
    });
    spriteSelector.addEventListener('input', ({ target }) => {
      switch (target.value) {
        case 'pikachu':
          store.dispatch(setSpriteSrc(playerTile.altSrc));
          break;
        case 'sacha':
          store.dispatch(setSpriteSrc(playerTile.src));
          break;
        default:
          store.dispatch(setSpriteSrc(playerTile.src));
      }
    });
    directionSelector.addEventListener('input', ({ target }) => {
      store.dispatch(setDirection(target.value));
    });

    style.textContent = `
      #debug-nav-container {
        box-sizing: border-box;
        position: absolute;
        padding: 50px 10px 10px;
        width: 200px;
        height: 100vh;
        top: 0;
        right: -200px;
        bottom: 0;
        transition: right ease-in-out 0.5s;
        z-index: 991;
        background: wheat;
        color: black;
      }
      
      #debug-nav-container.active {
        right: 0;
      }
      
      #debug-nav-toggle {
        position: absolute;
        height: 30px;
        width: 180px;
        top: 10px;
        right: 10px;
        border: none;
        z-index: 992;
        font-size: 8px;
        box-shadow: 0px 0px 5px rgba(0,0,0,.5);
      }
      
      #debug-nav-toggle:active,
      #debug-nav-toggle:focus,
      #debug-nav-toggle:hover {
        outline: none;
        border: none;
      }
      
      .input-container {
        width: 100%;
      }
      
      .input-container * {
        width: 100%;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(container);
    shadow.appendChild(navToggle);

    [
      sliderFilterContainer,
      directionSelectorContainer,
      spriteSelectorContainer,
    ].forEach(element => {
      const inputContainer = document.createElement('div');
      inputContainer.classList.add('input-container');
      inputContainer.appendChild(element);
      container.appendChild(inputContainer);
    });
  }
}

customElements.define('debug-nav', DebugNav);
