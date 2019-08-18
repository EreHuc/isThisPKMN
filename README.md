# Pokemon gen. 1 sprite based game + map editor
Because I can do it 💪

\>>> [Game](https://is-this-pkmn-game.netlify.com/) <<<

\>>> [Map editor](https://editor-is-this-pkmn-game.netlify.com/) <<<

## Play the game !

### Prerequisites

- Node
- Npm
- Modern web browser

### Install dependencies

```bash
$ npm install
```

### Run the project

Game
```bash
$ npm start
```

Map Editor
```bash
$ npm run dev:editor
```

## Feature
### Game 🕹
📌 Move !

📌 Collision

📌 Change Map

🔜 Speaking to object

🔜 Spawning other player

🔜 Speaking to other player

🔜 Sound

🔜 Gameplay (not find yet :/)

### Map editor 🗺
📌 Multi layer

📌 Collision

📌 Teleport point ( fully working with specific format, see below )

📌 Download map

📌 Upload map

📌 Reset map

📌 Display selected item

📌 Set spawn point

📌 Paint on click

📌 Eraser

📌 Auto save on quit

🔜 Drag painting

🔜 Bucket painting ( full-canvas )

🔜 Line painting ( horizontal, vertical )

🔜 UX Design

## Editor tips ( 'cause my UX suck ! )

- First button toggle collision mode:
	* It disable background / foreground layer
	* It apply current selected item collision to collision layer
	* Eraser reset collision square
	* **Always** use eraser on teleport square to fully remove it
	* Rule for **teleport dialog**:
		* **Always** set entrance point and exit point with the same id
		* Set a **`mapName`** on teleport entrance only if it teleport to an **other map**, exit map name is useless
		* Export maps in `src/maps.js` with the following format:
```js
import map1 from 'path/to/file.json';
import wenk from 'path/to/pouet.json';

export default {
  mapName:  map1,
  wenkMap: wenk,
  // default is mandatory !
  default: map1,
}
```
- Second button toggle between foreground and background layers:
	* Selected item overlay has the same color as current layer selected
	* On foreground layer, collision layer will be automatically set depending on current element selected default layer
	
- Third button display prompt, choose a file name and download your map !

- Fourth button open a dialog that let you upload a json valid map

- Fifth button let you load uploaded map

- Sixth button reset current map, **careful with this one, no going back**

- You can see the full list of available tile at `src/variables.js` under `backgroundTile.list`

- You can add / update tile, you can find png file at `src/assets/tiles.png`. Remember to add tile to `backgroundTile.list`

