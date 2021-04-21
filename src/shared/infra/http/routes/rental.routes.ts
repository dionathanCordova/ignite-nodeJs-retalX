import { Router } from "express";
import CreateRentalController from "@modules/rentals/useCases/CreateRentalController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const rentalRoute = Router();

const rentalController = new CreateRentalController();

rentalRoute.post("/", ensureAuthenticate, rentalController.handle);

export default rentalRoute;
