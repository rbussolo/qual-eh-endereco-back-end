import { Request, Response } from "express";
import { ListStateService } from "./ListStateService";

interface ListStateBody {
  name: string;
}

export class ListStateController {
  async handle(request: Request, response: Response) {
    const { name } = request.query as unknown as ListStateBody;

    const service = new ListStateService();
    const result = await service.execute({ name, select: { code: true, name: true, short_name: true, short_country: true } });

    return response.json(result);
  }
}