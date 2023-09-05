import { Request, Response } from "express";
import { ListCityService } from "./ListCityService";
import { errorCityNotFound, errorCityStateRequired } from "../../../../errors/ErrorsCode";

interface ListCityBody {
  short_state: string;
  name: string;
}

export class ListCityController {
  async handle(request: Request, response: Response) {
    const { short_state, name } = request.query as unknown as ListCityBody;

    if (!short_state) {
      return response.json(errorCityStateRequired);
    }

    const service = new ListCityService();
    const result = await service.execute({
      short_state, name, select: {
        code: true,
        name: true,
        short_name: true,
        zip_code: true,
        short_country: true,
        short_state: true,
        code_ibge: true
    }});

    if (!result.length) {
      return response.json(errorCityNotFound);
    }

    return response.json(result);
  }
}