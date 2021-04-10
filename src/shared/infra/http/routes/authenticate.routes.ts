import { Router } from "express";

const authenticateRoute = Router();

import AuthenticateUserController from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateUserController = new AuthenticateUserController();

authenticateRoute.post("/session", authenticateUserController.handle);

export default authenticateRoute;
