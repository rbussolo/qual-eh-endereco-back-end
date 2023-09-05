import { AppDataSource } from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { Country } from "../../entities/Country";

interface DeleteCountryProps {
  id: number;
}

export class DeleteCountryService {
  async execute({ id }: DeleteCountryProps): Promise<AppError | void>{ 
    const repo = AppDataSource.getRepository(Country);
    const country = await repo.findOne({ where: { id }});

    if (!country) {
      return new AppError("Registro não localizado!");
    }

    await repo.delete(id);
  }
}