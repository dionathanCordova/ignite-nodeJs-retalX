import Rentals from "@modules/rentals/infra/typeorm/entities/Rentals";
import IRentalsRepository from "../IRentalsRepository";

export default class RentalRepositoryInMemory implements IRentalsRepository {
   rentals: Rentals[] = [];

   async findOpenRentalByCar(car_id: string): Promise<Rentals> {
      return this.rentals.find((rent) => rent.car_id === car_id && !rent.end_date);
   }

   async findOpenRentalByUser(user_id: string): Promise<Rentals> {
      return this.rentals.find((rent) => rent.user_id === user_id && !rent.end_date);
   }

   async create(user_id: string, car_id: string, expected_return_date: Date): Promise<Rentals> {
      const rental = new Rentals();

      Object.assign(rental, {
         car_id,
         user_id,
         expected_return_date,
         start_date: new Date(),
      });

      this.rentals.push(rental);

      return rental;
   }

   async all(): Promise<Rentals[]> {
      return this.rentals;
   }
}
