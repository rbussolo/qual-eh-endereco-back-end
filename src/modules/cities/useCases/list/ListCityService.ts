import { FindOptionsWhere, Like } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { City } from "../../entities/City";

interface ListCityProps {
  short_state?: string;
  name?: string;
  select?: {
    id?: boolean;
    code?: boolean;
    name?: boolean;
    short_name?: boolean;
    zip_code?: boolean;
    short_country?: boolean;
    short_state?: boolean;
    state_id?: boolean;
    code_ibge?: boolean;
    created_at?: boolean;
  }
}

const selectDefault = {
  id: true,
  code: true,
  name: true,
  short_name: true,
  zip_code: true,
  short_country: true,
  short_state: true,
  state_id: true,
  code_ibge: true,
  created_at: true
}

export class ListCityService {
  async execute({ short_state = "", name = "", select = selectDefault }: ListCityProps): Promise<City[]> {
    const repo = AppDataSource.getRepository(City);
    const where: FindOptionsWhere<City> = {};
    
    if(short_state) {
      where.short_state = short_state;
    }

    if(name) {
      where.name = Like(name + '%')
    }
    
    const cities = await repo.find({ select: { ...select }, where, order: { short_state: "ASC", name: "ASC" } })
    
    return cities;
  }
}