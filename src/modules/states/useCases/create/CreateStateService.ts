
import { AppDataSource } from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { State } from "../../entities/State";

interface CreateStateProps {
  code?: number;
  name: string;
  short_name: string;
  short_country: string;
}

export class CreateStateService {
  async execute({ code, name, short_name, short_country }: CreateStateProps): Promise<AppError | void> {
    if (!name) {
      return new AppError("Nome do estado é obrigatório!");
    } else if (!short_name) {
      return new AppError("Sigla do estado é obrigatório!");
    } else if (!short_country) {
      return new AppError("Sigla do país é obrigatório!");
    }

    const repo = AppDataSource.getRepository(State);
    const stateExists = await repo.findOne({ where: { name } });

    if (stateExists) {
      return new AppError("Já existe um estado com este nome.");
    }

    const state = repo.create({
      code,
      name,
      short_name,
      short_country
    });

    await repo.save(state);
  }
}