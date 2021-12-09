import { db } from "../database/indexedDatabase";
import IQuote from "../interfaces/IQuote";
import IScheduleJson, { ISchedule } from "../interfaces/ISchedule";
import IUniversity from "../interfaces/IUniversity";

export const getUniversities = async () => {
  var universities: Array<IUniversity> = [];
  (await db.universityList.toArray()).forEach((university) => {
    universities.push(university);
  });
  return universities;
  // console.log(universities);
};

export const getUniversity = async (uniCode: string) => {
  var university = await db.universityList
    .where("uniCode")
    .equalsIgnoreCase(uniCode)
    .first();
  return university;
};

export const saveUniversity = async (universities: Array<IUniversity>) => {
  db.universityList.clear();
  db.universityList.bulkAdd(universities);
};

export const getQuotes = async () => {
  var quotes: Array<IQuote> = [];
  (await db.quotesList.toArray()).forEach((quote) => {
    quotes.push(quote);
  });
  return quotes;
};

export const saveQuotes = async (quotes: Array<IQuote>) => {
  db.quotesList.clear();
  db.quotesList.bulkAdd(quotes);
};

export const getSchedule = async () => {
  var schedule: IScheduleJson = {} as IScheduleJson;
  schedule.schedule = [] as Array<ISchedule>;
  (await db.schedule.toArray()).forEach((sche) => {
    schedule.schedule.push(sche);
  });
  schedule.note = "";
  return schedule;
};

export const saveSchedule = async (schedule: Array<ISchedule>) => {
  try {
    db.schedule.clear();
    schedule.forEach((sche) => db.schedule.add(sche));
  } catch (error: any) {
    // console.log(error.message);
  }
};
