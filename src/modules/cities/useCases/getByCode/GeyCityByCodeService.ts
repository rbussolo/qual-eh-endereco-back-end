import { AppDataSource } from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { errorCityNotFoundWithCode } from "../../../../errors/ErrorsCode";
import { City } from "../../entities/City";

interface GetCityByCodeProps {
  code: number;
}

export class GetCityByCodeService {
  async execute({ code }: GetCityByCodeProps): Promise<City | AppError> {
    const repo = AppDataSource.getRepository(City);
    const city = await repo.findOne({ where: { code } });

    if (!city) {
      return errorCityNotFoundWithCode(code);
    }

    return city;
  }
}