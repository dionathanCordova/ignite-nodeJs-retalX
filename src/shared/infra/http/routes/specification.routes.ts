import { Router } from "express";
import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensureAuthenticate";
import CreateSpecificationController from "@modules/cars/useCases/CreateSpecification/CreateSpecificationController";

const specificationRoute = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoute.use(ensureAuthenticate);
specificationRoute.post("/create", createSpecificationController.handler);

export default specificationRoute;
