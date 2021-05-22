import { Request, Response } from "express";
import { container } from "tsyringe";
import ListAvailableCarsUseCase from "./ListAvailableCarsUseCase";

export default class ListAvailableCarsController {
   async handle(request: Request, response: Response): Promise<Response> {
      const { brand, name, category_id } = request.query;

      const listAvailableCarUseCase = container.resolve(ListAvailableCarsUseCase);

      const list = await listAvailableCarUseCase.execute({
         brand: brand as string,
         name: name as string,
         category_id: category_id as string,
      });

      return response.json(list);
   }
}
