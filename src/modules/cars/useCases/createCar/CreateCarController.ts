import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateCarUseCase from "./CreateCarUseCase";

export default class CreateCarController {
   async handle(request: Request, response: Response): Promise<Response> {
      try {
         const { brand, name, category_id, daily_rate, description, fine_amount, license_plate } = request.body;

         const createCarUseCase = container.resolve(CreateCarUseCase);
         const cars = await createCarUseCase.execute({
            brand,
            name,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
         });

         return response.status(201).json(cars);
      } catch (error) {
         return response.status(401).json({ error: error.message });
      }
   }
}
