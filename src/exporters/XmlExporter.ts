import { DataExporter } from "./DataExporter";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

export class XmlExporter extends DataExporter {
  protected render(): string {
    const usersXml= this.data.map(
      (item) => `<user><id>${item.id}</id><name>${item.name}</name><email>${item.email}</email><phone>${item.phone}</phone></user>`
    )
    .join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>\n<users>\n${usersXml}\n</users>`;
  }

  protected afterRender():void {
    this.result = this.result.replace(
      /<\/users>$/,
      `  <!-- exported ${new Date().toISOString()} -->\n</users>`
    );
  }

  protected save(): void {
     const path = "./dist/users.xml";
    const dir = dirname(path);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(path, this.result, "utf-8");
  }
}
