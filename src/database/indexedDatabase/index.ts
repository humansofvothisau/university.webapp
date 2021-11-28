import Dexie from "dexie";
import University from "../../interfaces/University";

class hovUni extends Dexie {
  universityList: Dexie.Table<University, number>;

  constructor() {
    super("hovUni");
    this.version(1).stores({
      universityList: "++id,uniCode,uniName,url",
    });

    this.universityList = this.table("universityList");
  }
}

export var db = new hovUni();
