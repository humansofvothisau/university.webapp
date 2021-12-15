import { db } from "../database/indexedDatabase";
import IQuote from "../interfaces/IQuote";
import IScheduleJson, { ISchedule } from "../interfaces/ISchedule";
import IUniversity from "../interfaces/IUniversity";

export const getUniversities = async () => {
  var universities: Array<IUniversity> = [];
  try {
    (await db.universityList.toArray()).forEach((university) => {
      universities.push(university);
    });
    // console.log(universities);
  } catch (error: any) {
    console.log(error);
  }
  return universities;
};

export const getUniversity = async (uniCode: string) => {
  var university: IUniversity | undefined = {} as IUniversity;
  try {
    university = await db.universityList
      .where("uniCode")
      .equalsIgnoreCase(uniCode)
      .first();
  } catch (error: any) {
    console.log(error);
  }
  return university;
};

export const saveUniversity = async (universities: Array<IUniversity>) => {
  try {
    db.universityList.clear();
    db.universityList.bulkAdd(universities);
  } catch (error: any) {
    console.log(error);
  }
};

export const getQuotes = async () => {
  var quotes: Array<IQuote> = [];
  try {
    (await db.quotesList.toArray()).forEach((quote) => {
      quotes.push(quote);
    });
  } catch (error: any) {
    console.log(error);
  }
  return quotes;
};

export const saveQuotes = async (quotes: Array<IQuote>) => {
  try {
    db.quotesList.clear();
    db.quotesList.bulkAdd(quotes);
  } catch (error: any) {
    console.log(error);
  }
};

export const getSchedule = async () => {
  var schedule: IScheduleJson = {} as IScheduleJson;
  try {
    schedule.schedule = [] as Array<ISchedule>;
    (await db.schedule.toArray()).forEach((sche) => {
      schedule.schedule.push(sche);
    });
    schedule.note = "";
  } catch (error: any) {
    console.log(error);
  }
  return schedule;
};

export const saveSchedule = async (schedule: Array<ISchedule>) => {
  try {
    db.schedule.clear();
    schedule.forEach((sche) => db.schedule.add(sche));
  } catch (error: any) {
    console.log(error);
  }
};
