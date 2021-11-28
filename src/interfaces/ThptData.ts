interface ResultGroup {
  key: string;
  value: number;
}

interface ThptData {
  toan?: number;
  nguVan?: number;
  ngoaiNgu?: number;
  vatLi?: number;
  hoaHoc?: number;
  sinhHoc?: number;
  khtn?: number;
  diaLi?: number;
  lichSu?: number;
  gdcd?: number;
  khxh?: number;
  resultGroup?: string;
  resultGroupConvert?: ResultGroup[];
  result: string;
}

export default ThptData;
