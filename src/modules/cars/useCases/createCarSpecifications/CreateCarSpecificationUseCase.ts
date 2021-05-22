import Car from "@modules/cars/infra/typeorm/entities/Car";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
   car_id: string;
   specification_id: string[];
}

@injectable()
export default class CreateSpecificationUseCase {
   constructor(
      @inject("CarsRepository")
      private carsRepository: ICarsRepository,

      @inject("SpecificationRepository")
      private specification: ISpecificationRepository
   ) {}

   async execute({ car_id, specification_id }: IRequest): Promise<Car> {
      const cars = await this.carsRepository.findAllAvailable();

      const car = await this.carsRepository.findById(car_id);

      if (!car) {
         throw new AppError("Car not exists");
      }

      const specifications = await this.specification.findByIds(specification_id);
      car.specification = specifications;

      await this.carsRepository.create(car);

      return car;
   }
}
