import { Router } from "express";
import uploadConfig from "@config/upload";
import multer from "multer";

import CreateCarController from "@modules/cars/useCases/createCar/CreateCarController";
import ListAvailableCarsController from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsControlle";
import CreateCarSpecificationController from "@modules/cars/useCases/createCarSpecifications/CreateCarSpecificationController";
import UploadCarImageController from "@modules/cars/useCases/UploadCarImage/UploadCarImageController";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const carRoute = Router();
const uploadImage = multer(uploadConfig.upload("./tmp/cars"));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

carRoute.post("/", ensureAuthenticate, ensureAdmin, createCarController.handle);
carRoute.get("/available", listAvailableCarsController.handle);
carRoute.post("/specification/:car_id", ensureAuthenticate, ensureAdmin, createCarSpecificationController.handle);
carRoute.post(
   "/images/:id",
   ensureAuthenticate,
   ensureAdmin,
   uploadImage.array("images"),
   uploadCarImageController.handle
);

export default carRoute;
