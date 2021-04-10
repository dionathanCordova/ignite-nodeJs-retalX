import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import Car from "../entities/Car";

export default class CarsRepository implements ICarsRepository {
   private repository: Repository<Car>;

   constructor() {
      this.repository = getRepository(Car);
   }

   async create({
      brand,
      name,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
   }: ICreateCarDTO): Promise<Car> {
      const car = this.repository.create({
         brand,
         name,
         category_id,
         daily_rate,
         description,
         fine_amount,
         license_plate,
      });

      await this.repository.save(car);

      return car;
   }

   async findByLicensePlate(license_plate: string): Promise<Car> {
      return this.repository.findOne({ license_plate });
   }
}