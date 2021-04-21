import { AppError } from "@shared/errors/AppError";

import Rentals from "../infra/typeorm/entities/Rentals";
import IRentalsRepository from "../repositories/IRentalsRepository";
import DayJsProvider from "@shared/container/providers/DateProvider/implementations/DayJsProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
   user_id: string;
   car_id: string;
   expected_return_date: Date;
}

@injectable()
export default class CreateRentalUseCase {
   constructor(
      @inject("RentalRepository")
      private rentalsRepository: IRentalsRepository
   ) {}

   async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<any> {
      const minHourToRent = 24;

      const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

      if (carUnavailable) {
         throw new AppError("Car is not available");
      }

      const rentalOpenByUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

      if (rentalOpenByUser) {
         throw new AppError("There is an rental open for this user");
      }

      const dayJsProvider = new DayJsProvider();
      const compare = dayJsProvider.compareInHours(dayJsProvider.dateNow(), expected_return_date);

      if (compare < minHourToRent) {
         throw new AppError("The rend need 24 hours mininum");
      }

      return this.rentalsRepository.create(user_id, car_id, expected_return_date);
   }
}
