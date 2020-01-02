/**
 * Update canvas size when screen size move
 */
export default function handleCanvasSize() {
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
