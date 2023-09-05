import { Router } from "express";
import { ListCountryController } from "../modules/countries/useCases/list/ListCountryController";

const countriesRoutes = Router();

const listCountryController = new ListCountryController();

countriesRoutes.get("/", listCountryController.handle);

export { countriesRoutes };
