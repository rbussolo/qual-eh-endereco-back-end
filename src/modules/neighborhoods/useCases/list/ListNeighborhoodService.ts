import { FindOptionsWhere, Like } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { Neighborhood } from "../../entities/Neighborhood";

interface ListNeighborhoodProps {
  code_city?: number;
  name?: string;
  select?: {
    id?: boolean;
    code?: boolean;
    name?: boolean;
    short_name?: boolean;
    city_id?: boolean;
    created_at?: boolean;
  }
}

const selectDefault = {
  id: true,
  code: true,
  name: true,
  short_name: true,
  city_id: true,
  created_at: true
}

export class ListNeighborhoodService {
  async execute({ code_city, name, select = selectDefault }: ListNeighborhoodProps): Promise<Neighborhood[]> {
    const repo = AppDataSource.getRepository(Neighborhood);
    const where: FindOptionsWhere<Neighborhood> = {};

    if (code_city) {
      where.city = { code: code_city };
    }

    if (name) {
      where.name = Like(name + '%')
    }

    const neighborhoods = await repo.find({ select: { ...select }, where, order: { city: { short_country: 'ASC', name: 'ASC' }, name: 'ASC' } });

    return neighborhoods;
  }
}