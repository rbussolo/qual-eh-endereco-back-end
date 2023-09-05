
import { AppDataSource } from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { City } from "../../entities/City";

interface CreateCityProps {
  code: number;
  name: string;
  short_name?: string;
  zip_code?: string;
  short_country: string;
  short_state: string;
  state_id: number;
  code_ibge?: number | null;
}

export class CreateCityService {
  async execute({ code, name, short_name = "", zip_code = "", short_country, short_state, state_id, code_ibge }: CreateCityProps): Promise<AppError | void> {
    if (!name) {
      return new AppError("Nome da cidade é obrigatório!");
    } else if (!code) {
      return new AppError("Código da cidade é obrigatório!");
    } else if (!short_country) {
      return new AppError("Sigla do país é obrigatório!");
    } else if (!short_state) {
      return new AppError("Sigla do estado é obrigatório!");
    } else if (!state_id) {
      return new AppError("Id do estado é obrigatório!");
    }

    const repo = AppDataSource.getRepository(City);
    const cityExists = await repo.findOne({ where: { code, name, state_id } });

    if (cityExists) {
      return new AppError("Já existe uma cidade com este nome neste estado.");
    }
    
    const city = repo.create({
      code,
      name,
      short_name,
      zip_code,
      short_country,
      short_state,
      state_id,
      code_ibge
    });

    await repo.save(city);
  }
}