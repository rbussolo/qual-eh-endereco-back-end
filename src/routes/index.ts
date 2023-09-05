import { Router } from "express";
import { countriesRoutes } from "./countries.routes";
import { statesRoutes } from "./states.routes";
import { citiesRoutes } from "./cities.routes";
import { neighborhoodsRoutes } from "./neighborhoods.routes";
import { addressesRoutes } from "./addresses.routes";
import { processingRoutes } from "./processing.routes";

const router = Router();

router.use("/api/countries", countriesRoutes);
router.use("/api/states", statesRoutes);
router.use("/api/cities", citiesRoutes);
router.use("/api/neighborhoods", neighborhoodsRoutes);
router.use("/api/addresses", addressesRoutes);
router.use("/api/processing", processingRoutes);

export { router };

