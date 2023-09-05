import { AppDataSource } from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { Address } from "../../entities/Address";

interface DeleteAddressProps {
  id: number;
}

export class DeleteAddressService {
  async execute({ id }: DeleteAddressProps): Promise<AppError | void> {
    const repo = AppDataSource.getRepository(Address);
    const address = await repo.findOne({ where: { id } });

    if (!address) {
      return new AppError("Registro não localizado!");
    }

    await repo.delete(id);
  }
}