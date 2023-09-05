import { Router } from "express";
import { GetAddressByZipCodeController } from "../modules/addresses/useCases/getByZipCode/GetAddressByZipCodeController";


const addressesRoutes = Router();

const getAddressByZipCodeController = new GetAddressByZipCodeController();

addressesRoutes.get("/", getAddressByZipCodeController.handle);

export { addressesRoutes };
