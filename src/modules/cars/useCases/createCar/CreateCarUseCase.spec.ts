import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import CreateCarUseCase from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
   beforeEach(() => {
      carsRepositoryInMemory = new CarsRepositoryInMemory();
      createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
   });
   it("should be able to create a new car", async () => {
      const car = await createCarUseCase.execute({
         brand: "Brand",
         name: "Car name",
         category_id: "1234123",
         daily_rate: 22,
         description: "Description car",
         fine_amount: 2,
         license_plate: "AVC-1234",
      });

      expect(car).toHaveProperty("id");
   });

   it("should not be able to create a car with already exists license_plate", () => {
      expect(async () => {
         await createCarUseCase.execute({
            brand: "Brand",
            name: "Car name1",
            category_id: "1234123",
            daily_rate: 22,
            description: "Description car",
            fine_amount: 2,
            license_plate: "AVC-1234",
         });

         await createCarUseCase.execute({
            brand: "Brand",
            name: "Car name2",
            category_id: "1234123",
            daily_rate: 22,
            description: "Description car",
            fine_amount: 2,
            license_plate: "AVC-1234",
         });
      }).rejects.toBeInstanceOf(AppError);
   });

   it("should be able to create a car with available true by default", async () => {
      const car = await createCarUseCase.execute({
         brand: "Brand",
         name: "Car name2",
         category_id: "1234123",
         daily_rate: 22,
         description: "Description car",
         fine_amount: 2,
         license_plate: "AVC-1234",
      });

      expect(car.available).toBe(true);
   });
});
