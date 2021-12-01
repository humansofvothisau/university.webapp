interface IResultGroup {
  key: string;
  value: number;
}

interface IThptData {
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
  resultGroupConvert?: IResultGroup[];
  result: string;
}

export default IThptData;
