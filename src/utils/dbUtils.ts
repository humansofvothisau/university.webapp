import University from "../interfaces/University";
import Quote from "../interfaces/Quote";

import { db } from "../database/indexedDatabase";

export const isStoredState = (stateName: string): boolean => {
  const sessionState = sessionStorage.getItem(stateName);

  return sessionState ? true : false;
};

export const getUniversities = async () => {
  var universities: Array<University> = [];
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

export const saveUniversity = async (universities: Array<University>) => {
  db.universityList.clear();
  db.universityList.bulkAdd(universities);
};

export const getQuotes = async () => {
  var quotes: Array<Quote> = [];
  (await db.quotesList.toArray()).forEach((quote) => {
    quotes.push(quote);
  });
  return quotes;
};

export const saveQuotes = async (quotes: Array<Quote>) => {
  db.quotesList.clear();
  db.quotesList.bulkAdd(quotes);
};
