import Dexie from "dexie";
import IQuote from "../../interfaces/IQuote";
import { ISchedule } from "../../interfaces/ISchedule";
import IUniversity from "../../interfaces/IUniversity";

class hovUni extends Dexie {
  quotesList!: Dexie.Table<IQuote, number>;
  universityList!: Dexie.Table<IUniversity, number>;
  schedule!: Dexie.Table<ISchedule, number>;

  constructor() {
    super("hovUni");
    this.version(1.1).stores({
      quotesList: "++id,quote,author",
      universityList: "++id,uniCode,uniName,url",
      schedule: "++id,date,morning,afternoon",
    });

    // this.quotesList = this.table("quotesList");
    // this.universityList = this.table("universityList");
  }
}

var db = new hovUni();
db.open();
export { db };
