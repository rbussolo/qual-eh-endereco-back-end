import { Request, Response } from "express";
import { CreateCountryService } from "./CreateCountryService";
import { AppError } from "../../../../errors/AppError";

export class CreateCountryController {
  async handle(request: Request, response: Response) {
    const { name, short_name, name_in_english, short_in_english, name_in_french } = request.body;

    const service = new CreateCountryService();
    const result = await service.execute({ name, short_name, name_in_english, short_in_english, name_in_french });

    if (result instanceof AppError) {
      return response.status(result.statusCode).json({ message: result.message });
    }

    return response.status(200).json({ success: true });
  }
}