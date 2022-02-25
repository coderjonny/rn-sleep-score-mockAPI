export const calculateScore = (
  hoursInBed: number,
  hoursAsleep: number,
): number => {
  if (hoursInBed && hoursAsleep) {
    return 100 * (hoursAsleep / hoursInBed);
  }
  return 0;
};
