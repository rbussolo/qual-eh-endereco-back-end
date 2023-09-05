import { Router } from "express";
import { ListNeighborhoodController } from "../modules/neighborhoods/useCases/list/ListNeighborhoodController";

const neighborhoodsRoutes = Router();

const listNeighborhoodController = new ListNeighborhoodController();

neighborhoodsRoutes.get("/", listNeighborhoodController.handle);

export { neighborhoodsRoutes };
