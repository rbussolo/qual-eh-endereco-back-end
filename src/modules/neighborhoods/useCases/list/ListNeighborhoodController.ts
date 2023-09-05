import { Request, Response } from "express";
import { errorNeighborhoodCityIsNaN, errorNeighborhoodCityRequired, errorNeighborhoodNotFound } from "../../../../errors/ErrorsCode";
import { ListNeighborhoodService } from "./ListNeighborhoodService";

interface ListNeighborhoodBody {
  code_city: number;
  name: string;
}

export class ListNeighborhoodController {
  async handle(request: Request, response: Response) {
    const { code_city, name } = request.query as unknown as ListNeighborhoodBody;

    if (!code_city) {
      return response.json(errorNeighborhoodCityRequired);
    } else if (isNaN(code_city)) {
      return response.json(errorNeighborhoodCityIsNaN);
    }

    const service = new ListNeighborhoodService();
    const result = await service.execute({ code_city, name, select: { code: true, name: true, short_name: true } });

    if (!result.length) {
      return response.json(errorNeighborhoodNotFound);
    }

    return response.json(result);
  }
}