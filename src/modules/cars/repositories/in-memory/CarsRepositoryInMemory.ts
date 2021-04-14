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
      id,
      specification,
   }: ICreateCarDTO): Promise<Car> {
      const car = new Car();
      Object.assign(car, {
         license_plate,
         fine_amount,
         description,
         daily_rate,
         category_id,
         name,
         brand,
         id,
         specification,
      });

      this.cars.push(car);

      return car;
   }

   async findByLicensePlate(license_plate: string): Promise<Car> {
      return this.cars.find((car) => car.license_plate === license_plate);
   }

   async findAllAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
      const available = this.cars.filter((car) => {
         if (
            car.available === true ||
            (brand && car.brand === brand) ||
            (category_id && car.category_id === category_id) ||
            (name && car.name === name)
         ) {
            return car;
         }

         return null;
      });

      return available;
   }

   async findById(car_id: string): Promise<Car> {
      return this.cars.find((car) => car.id == car_id);
   }
}
