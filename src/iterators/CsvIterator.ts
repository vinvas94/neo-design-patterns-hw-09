import { readFileSync } from "fs";
import { UserData } from "../data/UserData";

export class CsvIterator implements Iterable<UserData> {
  private data: UserData[];

  constructor (path:string){
    const files = readFileSync(path, "utf-8");
    const lines = files.trim().split("\n");
    const rows = lines.slice(1);
    this.data = rows.map((row) => {
      const [id, name, email, phone] = row.split(",");
      return { id: Number(id), name, email, phone };
    });
  }
  *[Symbol.iterator](): Iterator<UserData> {
    for (const item of this.data) {
      yield item;
    }
  }
}
