import unzipper, { Entry } from "unzipper";
import etl from "etl";
import fs from "fs";
import { ProcessCountryService } from "../../../countries/useCases/process/ProcessCountryService";
import { ProcessStateService } from "../../../states/useCases/process/ProcessStateService";
import { ProcessCityService } from "../../../cities/useCases/process/ProcessCityService";
import { ProcessNeighborhoodService } from "../../../neighborhoods/useCases/process/ProcessNeighborhoodService";
import { ProcessAddressService } from "../../../addresses/useCases/process/ProcessAddressService";
import { File, processingInstance } from "../../entities/Processing";

export class ProcessClass {
  async execute() {
    processingInstance.startImporting();

    const processCountries = processingInstance.files.find(item => item.name === 'Países');
    const processStates = processingInstance.files.find(item => item.name === 'Estados');
    const processCities = processingInstance.files.find(item => item.name === 'Cidades');
    const processNeighborhood = processingInstance.files.find(item => item.name === 'Bairros');
    const processAddress = processingInstance.files.filter(item => item.name.includes('Logradouro'))
    
    if (processCountries.import) {
      await this.processSpecificFile(processingInstance.path, processCountries);
    }

    if (processStates.import) {
      await this.processSpecificFile(processingInstance.path, processStates);
    }

    if (processCities.import) {
      await this.processSpecificFile(processingInstance.path, processCities);
    }

    if (processNeighborhood.import) {
      await this.processSpecificFile(processingInstance.path, processNeighborhood);
    }

    if (processAddress.length) {
      await this.processAddress(processingInstance.path, processAddress);
    }

    processingInstance.finishImporting();
  }

  async processSpecificFile(path: string, file: File) {
    await new Promise<void>((resolve) => {
      fs.createReadStream(path)
        .pipe(unzipper.Parse())
        .pipe(etl.map(async (entry: Entry) => {
          if (file.path == entry.path) {
            if (file.name == "Países") {
              await this.readAndInsertCountries(file, await entry.buffer());

            } else if (file.name == "Estados") {
              await this.readAndInsertStates(file, await entry.buffer());

            } else if (file.name == "Cidades") {
              await this.readAndInsertCities(file, await entry.buffer());

            } else if (file.name == "Bairros") {
              await this.readAndInsertNeighborhoods(file, await entry.buffer());

            } 
          } else {
            entry.autodrain();
          }
        }))
        .on("finish", () => {
          resolve();
        });
    });
  }

  async processAddress(path: string, files: File[]) {
    await fs.createReadStream(path)
      .pipe(unzipper.Parse())
      .pipe(etl.map(async (entry: Entry) => {
        const file = files.find(item => item.path === entry.path);

        if (file) {
          await this.readAndInsertAddress(file, entry.path, await entry.buffer());
        } else {
          entry.autodrain();
        }
      }));
  }

  async readAndInsertCountries(file: File, buffer: Buffer) {
    const content = buffer.toString('latin1');

    const processCountryService = new ProcessCountryService();
    await processCountryService.execute({ file, content });
  }

  async readAndInsertStates(file: File, buffer: Buffer) {
    const content = buffer.toString('latin1');

    const processStateService = new ProcessStateService();
    await processStateService.execute({ file, content });
  }

  async readAndInsertCities(file: File, buffer: Buffer) {
    const content = buffer.toString('latin1');

    const processCityService = new ProcessCityService();
    await processCityService.execute({ file, content });
  }

  async readAndInsertNeighborhoods(file: File, buffer: Buffer) {
    const content = buffer.toString('latin1');

    const processNeighborhoodService = new ProcessNeighborhoodService();
    await processNeighborhoodService.execute({ file, content });
  }

  async readAndInsertAddress(file: File, file_name: string, buffer: Buffer) {
    const match = file_name.match(/DNE_GU_(.{2})_LOGRADOUROS/gi);
    const short_state = match[1];

    const content = buffer.toString('latin1');

    const processAddressService = new ProcessAddressService();
    await processAddressService.execute({ file, short_state, content });
  }
}