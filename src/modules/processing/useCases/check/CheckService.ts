import unzipper, { Entry } from "unzipper";
import etl from "etl";
import fs from "fs";
import { processingInstance } from "../../entities/Processing";

interface CheckProps {
  path: string;
}

export class CheckService {
  async execute({ path }: CheckProps): Promise<boolean> {
    processingInstance.startCheck(path);

    await new Promise<void>((resolve) => {
      fs.createReadStream(processingInstance.path)
        .pipe(unzipper.Parse())
        .pipe(etl.map(async (entry: Entry) => {
          const item = processingInstance.files.find(item => item.path === entry.path);

          if (item) {
            item.check = true;
          }

          entry.autodrain();
        }))
        .on("finish", () => {
          resolve();
        });
    });

    return processingInstance.finishCheck();
  }
}