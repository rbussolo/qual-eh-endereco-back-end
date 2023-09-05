import { Request, Response } from "express";
import { ListCountryService } from "./ListCountryService";

interface ListCountryBody {
  name: string;
}

export class ListCountryController {
  async handle(request: Request, response: Response) {
    const { name } = request.query as unknown as ListCountryBody;
    
    const service = new ListCountryService();
    const result = await service.execute({ name, select: { name: true, short_name: true, name_in_english: true, short_in_english: true } });

    return response.json(result);
  }
}