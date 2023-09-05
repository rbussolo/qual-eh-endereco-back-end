import { FindOptionsWhere, Like } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { Country } from "../../entities/Country";

interface ListCountryProps {
  name?: string;
  select?: { 
    id?: boolean;
    name?: boolean;
    short_name?: boolean;
    name_in_english?: boolean;
    short_in_english?: boolean;
    name_in_french?: boolean;
    created_at?: boolean;
  };
}

const defaultSelect = {
  id: true,
  name: true,
  short_name: true,
  name_in_english: true,
  short_in_english: true,
  name_in_french: true,
  created_at: true,
}

export class ListCountryService {
  async execute({ name = "", select = defaultSelect }: ListCountryProps): Promise<Country[]> {
    const repo = AppDataSource.getRepository(Country);
    const where: FindOptionsWhere<Country> = name ? { name: Like(name + '%') } : {};
    
    const countries = await repo.find({ select: { ...select }, where, order: { name: "ASC" }})

    return countries;
  }
}