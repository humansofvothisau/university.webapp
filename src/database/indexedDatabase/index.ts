import Dexie from "dexie";
import Quote from "../../interfaces/Quote";
import University from "../../interfaces/University";

class hovUni extends Dexie {
  quotesList!: Dexie.Table<Quote, number>;
  universityList!: Dexie.Table<University, number>;

  constructor() {
    super("hovUni");
    this.version(1).stores({
      quotesList: "++id,quote,author",
      universityList: "++id,uniCode,uniName,url",
    });

    // this.quotesList = this.table("quotesList");
    // this.universityList = this.table("universityList");
  }
}

var db = new hovUni();
db.open();
export { db };
