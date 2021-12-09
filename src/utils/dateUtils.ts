export const convertTimeVn = (date: string) => {
  return new Date(
    new Date(date).toLocaleString("en-US", { timeZone: "Asia/Bangkok" })
  );
};

export const convertTimeString = (date: Date) => {
  return `${getZeroDisplay(date.getHours())}:${getZeroDisplay(
    date.getMinutes()
  )} ${getZeroDisplay(date.getDate())}/${getZeroDisplay(
    date.getMonth()
  )}/${date.getFullYear()}`;
};

export const difference = (from: Date, to: Date) => {
  // Convert to UTC+7 dates
  from = convertTimeVn(from.toUTCString());
  to = convertTimeVn(to.toUTCString());

  return to.valueOf() - from.valueOf();
};

const getZeroDisplay = (num: number): string => {
  if (num <= 0) {
    return `${num}`;
  }
  return num < 10 ? `0${num}` : `${num}`;
};
