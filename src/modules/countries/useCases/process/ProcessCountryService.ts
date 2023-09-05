import { File, processingInstance } from "../../../processing/entities/Processing";
import { Country } from "../../entities/Country";
import { CreateCountryService } from "../create/CreateCountryService";
import { DeleteCountryService } from "../delete/DeleteCountryService";
import { ListCountryService } from "../list/ListCountryService";

interface ProcessCountryProps {
  file: File;
  content: string;
}

interface CountryFromFile {
  name: string;
  short_name: string;
  name_in_english: string;
  short_in_english: string;
  name_in_french: string;
}

interface CountriesDifference {
  insert: CountryFromFile[];
  remove: Country[];
}

export class ProcessCountryService {
  async check({ file, content }: ProcessCountryProps): Promise<CountriesDifference> {
    const listCountryService = new ListCountryService();
    
    const countriesAtDB = await listCountryService.execute({});
    const countriesAtFile = await this.loadCountriesFromFile({ file, content });
    
    let posDB = 0;
    let posFile = 0;
    let countriesDifference: CountriesDifference = {
      insert: [],
      remove: []
    }

    while(countriesAtDB.length > posDB || countriesAtFile.length > posFile) {
      if (countriesAtDB.length === posDB) {
        countriesDifference.insert.push(countriesAtFile[posFile]);

        posFile += 1;
      } else if (countriesAtFile.length === posFile) {
        countriesDifference.remove.push(countriesAtDB[posDB]);

        posDB += 1;
      } else if (countriesAtDB[posDB].name === countriesAtFile[posFile].name) {
        posFile += 1;
        posDB += 1;
      } else if (countriesAtDB[posDB].name > countriesAtFile[posFile].name) {
        countriesDifference.insert.push(countriesAtFile[posFile]);

        posFile += 1;
      } else {
        countriesDifference.remove.push(countriesAtDB[posDB]);

        posDB += 1;
      }
    }

    return countriesDifference;
  }

  async loadCountriesFromFile({ file, content }: ProcessCountryProps): Promise<CountryFromFile[]>{
    let countries: CountryFromFile[] = [];

    const lines = content.split('\n');
    for(let i = 1; i < lines.length; i++) {
      const line = lines[i];

      const country: CountryFromFile = {
        name: line.substring(6, 78).trim(),
        short_name: line.substring(1, 3),
        name_in_english: line.substring(78, 150).trim(),
        short_in_english: line.substring(3, 6),
        name_in_french: line.substring(150, 222).trim()
      }

      countries.push(country);

      processingInstance.updateLinesImported(file.name);
    }

    return countries;
  }
  
  async execute({ file, content }: ProcessCountryProps) {
    processingInstance.startImportingFile(file.name);

    const countriesDifference = await this.check({ file, content });

    const createCountry = new CreateCountryService();
    const deleteCountry = new DeleteCountryService();

    for(let i = 0; i < countriesDifference.insert.length; i++) {
      createCountry.execute(countriesDifference.insert[i]);

      processingInstance.updateLinesImported(file.name);
    }

    for (let i = 0; i < countriesDifference.remove.length; i++) {
      deleteCountry.execute({ id: countriesDifference.remove[i].id });

      processingInstance.updateLinesImported(file.name);
    }

    processingInstance.finishImportingFile(file.name);
  }
}