import { canvas } from '../../variables';

export function createCanvas({
  id,
  className,
  containerElement,
  width = canvas.width,
  height = canvas.height,
}) {
  return (options = {}) => {
    const canvas = document.createElement('canvas');
    canvas.classList.add('canvas');
    canvas.setAttribute('id', id);
    canvas.width = width;
    canvas.height = height;
    className && canvas.classList.add(className);

    const context = containerElement
      .insertBefore(canvas, containerElement.firstChild)
      .getContext('2d');

    context.imageSmoothingEnabled = false;

    Object.entries(options).forEach(([key, value]) => {
      context[key] = value;
    });

    return context;
  };
}
