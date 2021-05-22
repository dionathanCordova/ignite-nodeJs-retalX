import "reflect-metadata";
import express, { Response, Request, NextFunction } from "express";
import "express-async-errors";
import "@shared/infra/typeorm";
import "@shared/container";

import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../../swagger.json";
import { AppError } from "@shared/errors/AppError";

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
   if (err instanceof AppError) {
      return response.status(err.statusCode).json({
         message: err.message,
      });
   }

   return response.status(500).json({
      status: "error",
      message: `Internal server error: - ${err.message}`,
   });
});

export default app;
