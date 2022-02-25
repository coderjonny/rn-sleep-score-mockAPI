export const calculateScore = (
  hoursInBed: number,
  hoursAsleep: number,
): number => {
  if (hoursInBed && hoursAsleep) {
    return 100 * (hoursAsleep / hoursInBed);
  }
  return 0;
};

export const hoursArray = [...Array(24).keys()].flatMap(h => {
  return [h + 0.5, h + 1];
});
