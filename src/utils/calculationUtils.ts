export type TotNghiep = {
  result: boolean;
  mark: number;
};

// export type TotNghiep;
export const calculateTHPT = (
  education: "thpt" | "gdtx",
  avg12: number,
  toan: number | undefined,
  van: number | undefined,
  nn: number | undefined,
  tohop: number | undefined,
  kk: number,
  plus: number
): TotNghiep => {
  var result: TotNghiep;

  var sum: number,
    total: number = 0;
  if (toan && van && tohop) {
    if (education === "thpt" && nn) {
      sum = toan + van + nn + tohop;
      total = ((sum + kk) / 4) * 0.7 + avg12 * 0.3 + plus;
      total = Math.round(total * 100) / 100;
    } else if (education === "gdtx") {
      sum = toan + van + tohop;
      total = (sum / 3 + kk / 4) * 0.7 + avg12 * 0.3 + plus;
      total = Math.round(total * 100) / 100;
    }
  }

  result = {
    result: total >= 5,
    mark: total,
  };

  return result;
};
