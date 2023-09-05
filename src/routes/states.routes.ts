import { Router } from "express";
import { ListStateController } from "../modules/states/useCases/list/ListStateController";

const statesRoutes = Router();

const listStateController = new ListStateController();

statesRoutes.get("/", listStateController.handle);

export { statesRoutes };
