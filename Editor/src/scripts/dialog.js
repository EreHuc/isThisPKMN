const dialogemplate = `
<div id="dialog-container">
  <form id="teleport-form">
    <label for="teleport-id">ID</label>
    <input type="text" id="teleport-id" name="id" autocomplete="off">
    <label for="teleport-map">Map name</label>
    <input type="text" id="teleport-map" name="map" autocomplete="off">  
    <button type="submit">OK !</button>
  </form>
</div>
`;

export function createDialog() {
  const dialogElement = document.createElement('div');
  dialogElement.innerHTML = dialogemplate;

  document.body.appendChild(dialogElement);
  document.getElementById('teleport-id').focus();

  return new Promise(resolve => {
    document
      .getElementById('teleport-form')
      .addEventListener('submit', formEvent => {
        formEvent.preventDefault();
        const {
          target: { map, id },
        } = formEvent;

        resolve({
          mapName: map.value,
          id: id.value,
        });

        document.body.removeChild(dialogElement);
      });
  });
}
