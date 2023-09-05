import { FindOptionsWhere, Like } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { State } from "../../entities/State";

interface ListStateProps {
  name?: string;
  select?: {
    id?: boolean;
    code?: boolean;
    name?: boolean;
    short_name?: boolean;
    short_country?: boolean;
    created_at?: boolean;
  };
}

const defaultSelect = {
  id: true,
  code: true,
  name: true,
  short_name: true,
  short_country: true,
  created_at: true,
}

export class ListStateService {
  async execute({ name = "", select = defaultSelect }: ListStateProps): Promise<State[]> {
    const repo = AppDataSource.getRepository(State);
    const where: FindOptionsWhere<State> = name ? { name: Like(name + '%') } : {};
    
    const states = await repo.find({ select: { ...select }, where, order: { name: "ASC" } })

    return states;
  }
}