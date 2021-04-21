import { Router } from "express";

import categoriesRoute from "./categories.routes";
import speficicationRoute from "./specification.routes";
import userRoute from "./users.routes";
import authenticateRoute from "./authenticate.routes";
import carRoute from "./cars.routes";
import rentalRoute from "./rental.routes";

const route = Router();

route.use("/categories", categoriesRoute);
route.use("/specification", speficicationRoute);
route.use("/users", userRoute);
route.use("/cars", carRoute);
route.use("/rental", rentalRoute);
route.use(authenticateRoute);

export default route;
