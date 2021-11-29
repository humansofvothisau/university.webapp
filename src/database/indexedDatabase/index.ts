import Dexie from "dexie";
import Quote from "../../interfaces/Quote";
import University from "../../interfaces/University";

class hovUni extends Dexie {
  universityList: Dexie.Table<University, number>;
  quotesList: Dexie.Table<Quote, number>;

  constructor() {
    super("hovUni");
    this.version(1).stores({
      universityList: "++id,uniCode,uniName,url",
      quotesList: "++id,quote,author",
    });

    this.universityList = this.table("universityList");
    this.quotesList = this.table("quotesList");
  }
}

export var db = new hovUni();
