export const paddedNumber = (number, length = 2) =>
  String(number).padStart(length, '0');

export const getId = (x, y) => `${paddedNumber(x)}:${paddedNumber(y)}`;
