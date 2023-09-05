import { AppDataSource } from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { State } from "../../entities/State";

interface DeleteStateProps {
  id: number;
}

export class DeleteStateService {
  async execute({ id }: DeleteStateProps): Promise<AppError | void> {
    const repo = AppDataSource.getRepository(State);
    const state = await repo.findOne({ where: { id } });

    if (!state) {
      return new AppError("Registro não localizado!");
    }

    await repo.delete(id);
  }
}