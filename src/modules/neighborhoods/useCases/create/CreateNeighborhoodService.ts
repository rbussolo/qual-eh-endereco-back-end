
import { AppDataSource } from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { Neighborhood } from "../../entities/Neighborhood";

interface CreateNeighborhoodProps {
  code?: number;
  name: string;
  short_name?: string;
  city_id: number;
}

export class CreateNeighborhoodService {
  async execute({ code, name, short_name = "", city_id }: CreateNeighborhoodProps): Promise<AppError | void> {
    if (!name) {
      return new AppError("Nome da cidade é obrigatório!");
    } else if (!city_id) {
      return new AppError("A cidade é obrigatório!");
    }

    const repo = AppDataSource.getRepository(Neighborhood);
    const neighborhoodExists = await repo.findOne({ where: { name, city_id } });

    if (neighborhoodExists) {
      return new AppError("Já existe um bairro com este nome nesta cidade.");
    }

    const neighborhood = repo.create({
      code,
      name,
      short_name,
      city_id
    });

    await repo.save(neighborhood);
  }
}