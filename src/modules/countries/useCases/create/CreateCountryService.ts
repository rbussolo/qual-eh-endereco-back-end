
import { AppDataSource } from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { Country } from "../../entities/Country";

interface CreateCountryRequest {
  name: string;
  short_name: string;
  name_in_english?: string;
  short_in_english?: string;
  name_in_french?: string;
}

export class CreateCountryService {
  async execute({ name, short_name, name_in_english = "", short_in_english = "", name_in_french = "" }: CreateCountryRequest): Promise<AppError | void> {
    if (!name) {
      return new AppError("Nome do país é obrigatório!");
    } else if (!short_name) {
      return new AppError("Sigla do país é obrigatório!");
    }

    const repo = AppDataSource.getRepository(Country);
    const countryExists = await repo.findOne({ where: { name } });

    if(countryExists) {
      return new AppError("Já existe um país com este nome.");
    }

    const country = repo.create({
      name,
      short_name,
      name_in_english,
      short_in_english,
      name_in_french
    });

    await repo.save(country);
  }
}