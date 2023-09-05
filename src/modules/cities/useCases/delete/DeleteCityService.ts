import { AppDataSource } from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { City } from "../../entities/City";

interface DeleteCityProps {
  id: number;
}

export class DeleteCityService {
  async execute({ id }: DeleteCityProps): Promise<AppError | void> {
    const repo = AppDataSource.getRepository(City);
    const city = await repo.findOne({ where: { id } });

    if (!city) {
      return new AppError("Registro não localizado!");
    }

    await repo.delete(id);
  }
}