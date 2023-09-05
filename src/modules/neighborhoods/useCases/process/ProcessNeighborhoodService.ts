import { AppDataSource } from "../../../../data-source";
import { City } from "../../../cities/entities/City";
import { GetCityByCodeService } from "../../../cities/useCases/getByCode/GeyCityByCodeService";
import { File, processingInstance } from "../../../processing/entities/Processing";
import { Neighborhood } from "../../entities/Neighborhood";
import { ListNeighborhoodService } from "../list/ListNeighborhoodService";

interface ProcessNeighborhoodProps {
  file: File;
  content: string;
}

interface NeighborhoodFromFile {
  code: number;
  name: string;
  short_name: string;
  city_id: number;
}

interface NeighborhoodsDifference {
  insert: NeighborhoodFromFile[];
  remove: Neighborhood[];
}

export class ProcessNeighborhoodService {
  async check({ file, content }: ProcessNeighborhoodProps): Promise<NeighborhoodsDifference> {
    const listNeighborhoodService = new ListNeighborhoodService();

    const neighborhoodsAtDB = await listNeighborhoodService.execute({});
    const neighborhoodsAtFile = await this.loadNeighborhoodsFromFile({ file, content });

    let neighborhoodsDifference: NeighborhoodsDifference = {
      insert: [],
      remove: []
    }

    // Percorre todas as cidades do arquivo e vai removendo da lista de cidades que esta presente no banco para saber o que deve ser adicionado e o que deve ser removido
    for (let i = 0; i < neighborhoodsAtFile.length; i++) {
      const index = neighborhoodsAtDB.findIndex(neighborhood => {
        return neighborhood.code === neighborhoodsAtFile[i].code
      });

      if (index >= 0) {
        // Neste caso existe o registro
        neighborhoodsAtDB.splice(index, 1);
      } else {
        // Neste caso tem que inserir o registro
        neighborhoodsDifference.insert.push(neighborhoodsAtFile[i]);
      }
    }

    // Tudo que sobrou dentro do campo que carregou pelo banco deve ser removido
    neighborhoodsDifference.remove = neighborhoodsAtDB;

    return neighborhoodsDifference;
  }

  async loadNeighborhoodsFromFile({ file, content }: ProcessNeighborhoodProps): Promise<NeighborhoodFromFile[]> {
    const getCityByCodeService = new GetCityByCodeService();
    
    let neighborhoods: NeighborhoodFromFile[] = [];

    const lines = content.split('\n');
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];

      if(line[0] === 'D') {
        const code = parseInt(line.substring(94, 102).trim());
        const code_city = parseInt(line.substring(9, 17).trim());

        if (!isNaN(code) && !isNaN(code_city)) {
          const city = await getCityByCodeService.execute({ code: code_city });

          if (city instanceof City) {
            const neighborhood: NeighborhoodFromFile = {
              code: code,
              name: line.substring(102, 174).trim(),
              short_name: line.substring(174, 210).trim(),
              city_id: city.id
            }

            neighborhoods.push(neighborhood);
          }
        }

        processingInstance.updateLinesImported(file.name);
      }
    }

    return neighborhoods;
  }

  async execute({ file, content }: ProcessNeighborhoodProps) {
    processingInstance.startImportingFile(file.name);

    const neighborhoodsDifference = await this.check({ file, content });
    const repo = AppDataSource.getRepository(Neighborhood);

    for (let i = 0; i < neighborhoodsDifference.insert.length; i++) {
      const neighborhood = repo.create(neighborhoodsDifference.insert[i]);
      await repo.save(neighborhood);

      processingInstance.updateLinesImported(file.name);
    }

    for (let i = 0; i < neighborhoodsDifference.remove.length; i++) {
      await repo.delete(neighborhoodsDifference.remove[i].id);

      processingInstance.updateLinesImported(file.name);
    }

    processingInstance.finishImportingFile(file.name);
  }
}