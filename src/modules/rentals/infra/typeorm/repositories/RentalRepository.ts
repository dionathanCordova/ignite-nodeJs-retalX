import { getRepository, Repository } from "typeorm";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import Rentals from "../entities/Rentals";

export default class RentalRepository implements IRentalsRepository {
   private repository: Repository<Rentals>;

   constructor() {
      this.repository = getRepository(Rentals);
   }

   async findOpenRentalByCar(car_id: string): Promise<Rentals> {
      return this.repository.findOne({ car_id });
   }

   async findOpenRentalByUser(user_id: string): Promise<Rentals> {
      return this.repository.findOne({ user_id });
   }

   async create(user_id: string, car_id: string, expected_return_date: Date): Promise<Rentals> {
      const rentalCreate = this.repository.create({
         car_id,
         user_id,
         expected_return_date,
      });

      await this.repository.save(rentalCreate);

      return rentalCreate;
   }

   async all(): Promise<Rentals[]> {
      return this.repository.find();
   }
}
