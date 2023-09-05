import { AppDataSource } from "../../../../data-source";
import { Address } from "../../entities/Address";

interface ListAddressProps {
  short_state: string;
}

export class ListAddressService {
  async execute({ short_state }: ListAddressProps): Promise<Address[]> {
    const repo = AppDataSource.getRepository(Address);

    const addresses: Address[] = await repo.createQueryBuilder('address')
      .innerJoin("neighborhoods", "neighborhood", "neighborhood.id = address.neighborhood_id")
      .innerJoin("cities", "city", "city.id = neighborhood.city_id")
      .where("city.short_state = :short_state", { short_state })
      .orderBy("city.short_state, city.name, neighborhood.name, address.name")
      .getRawMany();

    return addresses;
  }
}