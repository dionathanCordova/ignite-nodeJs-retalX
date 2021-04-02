import { Router } from "express";

import categoriesRoute from "./categories.routes";
import speficicationRoute from "./specification.routes";
import userRoute from "./users.routes";
import authenticateRoute from "./authenticate.routes";

const route = Router();

route.use("/categories", categoriesRoute);
route.use("/specification", speficicationRoute);
route.use("/users", userRoute);
route.use(authenticateRoute);

export default route;
