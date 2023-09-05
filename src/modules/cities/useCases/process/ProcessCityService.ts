import { AppDataSource } from "../../../../data-source";
import { File, processingInstance } from "../../../processing/entities/Processing";
import { ListStateService } from "../../../states/useCases/list/ListStateService";
import { City } from "../../entities/City";
import { ListCityService } from "../list/ListCityService";

interface ProcessCityProps {
  file: File;
  content: string;
}

interface CityFromFile {
  code: number;
  name: string;
  short_name: string;
  zip_code: string;
  short_country: string;
  short_state: string;
  state_id: number | null;
  code_ibge: number;
}

interface CitiesDifference {
  insert: CityFromFile[];
  remove: City[];
}

export class ProcessCityService {
  async check({ file, content }: ProcessCityProps): Promise<CitiesDifference> {
    const listCityService = new ListCityService();

    const citiesAtDB = await listCityService.execute({});
    const citiesAtFile = await this.loadCitiesFromFile({ file, content });

    let citiesDifference: CitiesDifference = {
      insert: [],
      remove: []
    }

    // Percorre todas as cidades do arquivo e vai removendo da lista de cidades que esta presente no banco para saber o que deve ser adicionado e o que deve ser removido
    for (let i = 0; i < citiesAtFile.length; i++) {
      const index = citiesAtDB.findIndex(city => {
        return city.code === citiesAtFile[i].code
      });

      if (index >= 0) {
        // Neste caso existe o registro
        citiesAtDB.splice(index, 1);
      } else {
        // Neste caso tem que inserir o registro
        citiesDifference.insert.push(citiesAtFile[i]);
      }
    }

    // Tudo que sobrou dentro do campo que carregou pelo banco deve ser removido
    citiesDifference.remove = citiesAtDB;

    return citiesDifference;
  }

  async loadCitiesFromFile({ file, content }: ProcessCityProps): Promise<CityFromFile[]> {
    const listStateService = new ListStateService();
    const states = await listStateService.execute({});

    let cities: CityFromFile[] = [];

    const lines = content.split('\n');
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
     
      if(line[0] === 'D') {
        const short_state = line.substring(3, 5).trim();
        const state = states.find((state) => state.short_name === short_state);
        const code_ibge = parseInt(line.substring(154, 161).trim());

        if (state) {
          const city: CityFromFile = {
            code: parseInt(line.substring(11, 19)),
            name: line.substring(19, 91).trim(),
            short_name: line.substring(99, 135).trim(),
            zip_code: line.substring(91, 99).trim(),
            short_country: line.substring(1, 3).trim(),
            short_state: short_state,
            state_id: state.id,
            code_ibge: code_ibge > 0 ? code_ibge : null
          }

          cities.push(city);

          processingInstance.updateLinesImported(file.name);
        }
      }
    }

    return cities;
  }

  async execute({ file, content }: ProcessCityProps) {
    processingInstance.startImportingFile(file.name);

    const citiesDifference = await this.check({ file, content });
    const repo = AppDataSource.getRepository(City);

    for (let i = 0; i < citiesDifference.insert.length; i++) {
      const city = repo.create(citiesDifference.insert[i]);
      await repo.save(city);

      processingInstance.updateLinesImported(file.name);
    }

    for (let i = 0; i < citiesDifference.remove.length; i++) {
      await repo.delete(citiesDifference.remove[i].id);

      processingInstance.updateLinesImported(file.name);
    }

    processingInstance.finishImportingFile(file.name);
  }
}