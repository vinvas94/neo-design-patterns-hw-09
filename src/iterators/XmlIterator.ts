import { readFileSync } from "fs";
import { UserData } from "../data/UserData";
import { XMLParser } from "fast-xml-parser";

export class XmlIterator implements Iterable<UserData> {
  private data: UserData[];

  constructor(path: string) {
    const files = readFileSync(path, "utf-8");
    const xmlWithoutComment = files.replace(/<!--[\s\S]*?-->/g, "");
    const parser = new XMLParser();
    const parsedData = parser.parse(xmlWithoutComment);
    const users = parsedData.users?.user ?? [];

    this.data = Array.isArray(users) ? users : [users];
  }

  *[Symbol.iterator]() {
    for (const item of this.data) {
      yield item;
    }
  }
}
