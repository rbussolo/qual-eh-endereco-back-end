import { AppDataSource } from "../../../../data-source";
import { Address } from "../../entities/Address";

interface GetAddressByZipCodeProps {
  zip_code: string;
}

export interface AddressResult {
  zip_code: string;
  name: string;
  short_name: string;
  neighborhood: string;
  city: string;
  state: string;
}

export class GetAddressByZipCodeService {
  async execute({ zip_code }: GetAddressByZipCodeProps): Promise<AddressResult> {
    const repo = AppDataSource.getRepository(Address);

    const address: AddressResult = await repo.createQueryBuilder('address')
      .select("address.zip_code as zip_code")
      .addSelect("address.name as name")
      .addSelect("address.short_name as short_name")
      .addSelect("neighborhood.name as neighborhood")
      .addSelect("city.name as city")
      .addSelect("city.short_state as state")
      .innerJoin("neighborhoods", "neighborhood", "neighborhood.id = address.neighborhood_id")
      .innerJoin("cities", "city", "city.id = neighborhood.city_id")
      .where("address.zip_code = :zip_code", { zip_code })
      .orderBy("city.short_state, city.name, neighborhood.name, address.name")
      .getRawOne();

    return address;
  }
}