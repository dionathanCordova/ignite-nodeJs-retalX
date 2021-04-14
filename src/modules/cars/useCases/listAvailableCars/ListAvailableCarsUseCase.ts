import Car from "@modules/cars/infra/typeorm/entities/Car";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

interface IResponse {
   brand?: string;
   name?: string;
   category_id?: string;
}

@injectable()
export default class ListAvailableUseCase {
   constructor(
      @inject("CarsRepository")
      private carsRepository: ICarsRepository
   ) {}

   async execute({ brand, category_id, name }: IResponse): Promise<Car[]> {
      const cars = await this.carsRepository.findAllAvailable(brand, category_id, name);

      return cars;
   }
}
