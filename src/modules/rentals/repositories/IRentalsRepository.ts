import Rentals from "../infra/typeorm/entities/Rentals";

export default interface IRentalsRepository {
   findOpenRentalByCar(car_id: string): Promise<Rentals>;
   findOpenRentalByUser(user_id: string): Promise<Rentals>;
   create(user_id: string, car_id: string, expected_return_date: Date): Promise<Rentals>;
   all(): Promise<Rentals[]>;
}
