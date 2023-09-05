
import { AppDataSource } from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { Address } from "../../entities/Address";

interface CreateAddressProps {
  code: number;
  name: string;
  short_name?: string;
  zip_code: string;
  neighborhood_id: number;
}

export class CreateAddressService {
  async execute({ code, name, short_name = "", zip_code, neighborhood_id }: CreateAddressProps): Promise<AppError | void> {
    if (!name) {
      return new AppError("Nome do Logradouro é obrigatório!");
    } else if (!zip_code) {
      return new AppError("O CEP é obrigatório!");
    } else if (!code) {
      return new AppError("O Código do DNE é obrigatório!");
    } else if (!neighborhood_id) {
      return new AppError("O bairro é obrigatório!");
    }

    const repo = AppDataSource.getRepository(Address);
    const addressExists = await repo.findOne({ where: { name, neighborhood_id, zip_code } });

    if (addressExists) {
      return new AppError("Já existe um logradouro com este nome / cep neste bairro.");
    }

    const address = repo.create({
      code,
      name,
      short_name,
      zip_code,
      neighborhood_id
    });

    await repo.save(address);
  }
}