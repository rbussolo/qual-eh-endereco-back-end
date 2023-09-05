import { Router } from "express";
import { ListCityController } from "../modules/cities/useCases/list/ListCityController";

const citiesRoutes = Router();

const listCityController = new ListCityController();

citiesRoutes.get("/", listCityController.handle);

export { citiesRoutes };
