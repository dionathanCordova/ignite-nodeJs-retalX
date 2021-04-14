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
      specification,
      id,
   }: ICreateCarDTO): Promise<Car> {
      const car = this.repository.create({
         brand,
         name,
         category_id,
         daily_rate,
         description,
         fine_amount,
         license_plate,
         specification,
         id,
      });

      await this.repository.save(car);

      return car;
   }

   async findByLicensePlate(license_plate: string): Promise<Car> {
      return this.repository.findOne({ license_plate });
   }

   async findAllAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
      const carsQuery = this.repository.createQueryBuilder("c").where("available = :available", { available: true });

      if (brand) {
         carsQuery.andWhere("c.brand = :brand", { brand });
      }

      if (name) {
         carsQuery.andWhere("c.name = :name", { name });
      }

      if (category_id) {
         carsQuery.andWhere("c.category_id = :category_id", { category_id });
      }

      return carsQuery.getMany();
   }

   async findById(car_id: string): Promise<Car> {
      return this.repository.findOne({ id: car_id });
   }
}
