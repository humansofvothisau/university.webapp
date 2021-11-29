export const convertTimeVn = (date: string) => {
  return new Date(
    new Date(date).toLocaleString("en-US", { timeZone: "Asia/Bangkok" })
  );
};

export const difference = (from: Date, to: Date) => {
  // Convert to UTC+7 dates
  from = convertTimeVn(from.toUTCString());
  to = convertTimeVn(to.toUTCString());

  return to.valueOf() - from.valueOf();
};
