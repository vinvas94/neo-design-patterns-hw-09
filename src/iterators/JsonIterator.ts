import { readFileSync } from "fs";
import { UserData } from "../data/UserData";

export class JsonIterator implements Iterable<UserData> {
  private data: UserData[];

  constructor (path:string){
    const files = readFileSync(path, "utf-8");
    this.data = JSON.parse(files);
  }
  *[Symbol.iterator](): Iterator<UserData> {
    for (const item of this.data) {
      yield item;
    }
  }
}
