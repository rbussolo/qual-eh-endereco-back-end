import { AppDataSource } from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { Neighborhood } from "../../entities/Neighborhood";

interface GetNeighborhoodByCodeProps {
  code: number;
}

export class GetNeighborhoodByCodeService {
  async execute({ code }: GetNeighborhoodByCodeProps): Promise<Neighborhood | AppError> {
    const repo = AppDataSource.getRepository(Neighborhood);
    const neighborhood = await repo.findOne({ where: { code } });

    if (!neighborhood) {
      return new AppError(`Bairro não localizada com o código ${code}.`);
    }

    return neighborhood;
  }
}