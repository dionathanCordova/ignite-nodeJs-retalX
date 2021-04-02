import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUserUseCases from "./CreateUserUseCases";

class CreateUserController {
   async handle(request: Request, response: Response): Promise<Response> {
      try {
         const { name, email, password, driver_license } = request.body;

         console.log({ name, email, password, driver_license });
         const createUserUseCase = container.resolve(CreateUserUseCases);
         await createUserUseCase.execute({ name, email, password, driver_license });

         return response.status(201).send();
      } catch (error) {
         return response.status(404).json({ error: error.message });
      }
   }
}

export default CreateUserController;
