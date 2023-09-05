import { AppDataSource } from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { Neighborhood } from "../../entities/Neighborhood";

interface DeleteNeighborhoodProps {
  id: number;
}

export class DeleteNeighborhoodService {
  async execute({ id }: DeleteNeighborhoodProps): Promise<AppError | void> {
    const repo = AppDataSource.getRepository(Neighborhood);
    const neighborhood = await repo.findOne({ where: { id } });

    if (!neighborhood) {
      return new AppError("Registro não localizado!");
    }

    await repo.delete(id);
  }
}