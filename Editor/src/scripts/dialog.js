const dialogemplate = label => `
<div id="dialog-container">
  <form id="teleport-form">
    <h3>${label}</h3>
    <label for="teleport-id">ID</label>
    <input type="text" id="teleport-id" name="id" autocomplete="off" required>
    <label for="teleport-map">Map name</label>
    <input type="text" id="teleport-map" name="map" autocomplete="off"> 
    <div id="teleport-form-actions">
      <button type="submit">OK !</button>
      <button type="button" id="cancel">CLOSE :(</button>  
    </div> 
  </form>
</div>
`;

export function createDialog(label) {
  const dialogElement = document.createElement('div');
  dialogElement.innerHTML = dialogemplate(label);

  document.body.appendChild(dialogElement);
  document.getElementById('teleport-id').focus();

  return new Promise((resolve, reject) => {
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

    document.getElementById('cancel').addEventListener('click', () => {
      reject('cancel');
      document.body.removeChild(dialogElement);
    });
  });
}
