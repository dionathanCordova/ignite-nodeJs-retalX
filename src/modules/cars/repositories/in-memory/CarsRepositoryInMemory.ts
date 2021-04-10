import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import Car from "@modules/cars/infra/typeorm/entities/Car";
import ICarsRepository from "../ICarsRepository";

export default class CarsRepositoryInMemory implements ICarsRepository {
   cars: Car[] = [];

   async create({
      license_plate,
      fine_amount,
      description,
      daily_rate,
      category_id,
      name,
      brand,
   }: ICreateCarDTO): Promise<Car> {
      const car = new Car();
      Object.assign(car, { license_plate, fine_amount, description, daily_rate, category_id, name, brand });

      this.cars.push(car);

      return car;
   }

   async findByLicensePlate(license_plate: string): Promise<Car> {
      return this.cars.find((car) => car.license_plate === license_plate);
   }
}