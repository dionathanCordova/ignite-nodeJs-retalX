import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateCarSpecificationUseCase from "./CreateCarSpecificationUseCase";

export default class CreateCarSpecificationController {
   async handle(request: Request, response: Response): Promise<Response> {
      const { car_id } = request.params;
      const { specification_id } = request.body;

      const carSpecificationUseCae = container.resolve(CreateCarSpecificationUseCase);

      const cars = await carSpecificationUseCae.execute({
         car_id,
         specification_id,
      });

      return response.status(201).json(cars);
   }
}
