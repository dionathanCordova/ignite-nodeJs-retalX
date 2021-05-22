import DayJsProvider from "@shared/container/providers/DateProvider/implementations/DayJsProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import RentalRepositoryInMemory from "../repositories/in-memory/RentalsRepositoryInMemory";
import CreateRentalUseCase from "./CreateRentalUseCase";

let rentalsRepository: RentalRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayJsDateProvider: DayJsProvider;

describe("Create Rental", () => {
   const dayAdd1Day = dayjs().add(1, "day").toDate();

   beforeEach(() => {
      rentalsRepository = new RentalRepositoryInMemory();
      dayJsDateProvider = new DayJsProvider();
      createRentalUseCase = new CreateRentalUseCase(rentalsRepository);
   });

   it("should be able to create a new rental", async () => {
      const rental = await createRentalUseCase.execute({
         car_id: "1234",
         user_id: "3333",
         expected_return_date: dayAdd1Day,
      });

      expect(rental).toHaveProperty("id");
      expect(rental).toHaveProperty("start_date");
   });

   it("should not be able to create a rental to an car already in use", async () => {
      expect(async () => {
         await createRentalUseCase.execute({
            car_id: "1234",
            user_id: "3333",
            expected_return_date: dayAdd1Day,
         });

         await createRentalUseCase.execute({
            car_id: "1234",
            user_id: "1111",
            expected_return_date: dayAdd1Day,
         });
      }).rejects.toBeInstanceOf(AppError);
   });

   it("should not be able to create a rental to an user who have an open rental", async () => {
      expect(async () => {
         await createRentalUseCase.execute({
            car_id: "1234",
            user_id: "3333",
            expected_return_date: dayAdd1Day,
         });

         await createRentalUseCase.execute({
            car_id: "1234",
            user_id: "3333",
            expected_return_date: dayAdd1Day,
         });
      }).rejects.toBeInstanceOf(AppError);
   });

   it("should not be able to create a rental with less than 24 hours", async () => {
      expect(async () => {
         await createRentalUseCase.execute({
            car_id: "1234",
            user_id: "3333",
            expected_return_date: dayjs().toDate(),
         });
      }).rejects.toBeInstanceOf(AppError);
   });
});
