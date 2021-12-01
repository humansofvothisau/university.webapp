export interface ISchedule {
  date: string;
  morning: string;
  afternoon: string;
}

export default interface IScheduleJson {
  schedule: Array<ISchedule>;
  note: string | null;
}
