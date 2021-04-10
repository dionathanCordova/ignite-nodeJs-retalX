import { Router } from "express";
import CreateCarController from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const createCarController = new CreateCarController();
const carRoute = Router();

carRoute.post("/", ensureAuthenticate, ensureAdmin, createCarController.handle);

export default carRoute;
