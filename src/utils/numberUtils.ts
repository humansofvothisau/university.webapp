export const getRandomInt = (min: number, max: number): number => {
  if (min > max) {
    let tempt = min;
    min = max;
    max = tempt;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
