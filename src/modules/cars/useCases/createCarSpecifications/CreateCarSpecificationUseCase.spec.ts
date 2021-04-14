import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import SpecificationInMemory from "@modules/cars/repositories/in-memory/SpecificationInMemory";
import { AppError } from "@shared/errors/AppError";
import CreateCarSpecificationUseCase from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationInMemory: SpecificationInMemory;

describe("Create Car Specification", () => {
   beforeEach(() => {
      specificationInMemory = new SpecificationInMemory();
      carsRepositoryInMemory = new CarsRepositoryInMemory();
      createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationInMemory);
   });

   it("should be able to create car specification", async () => {
      const car = await carsRepositoryInMemory.create({
         brand: "Brand",
         name: "Car name",
         category_id: "1234123",
         daily_rate: 22,
         description: "Description car",
         fine_amount: 2,
         license_plate: "AVC-1234",
      });

      const specification = await specificationInMemory.create({
         description: "teste",
         name: "teste",
      });

      const specification_id = [specification.id];
      const add = await createCarSpecificationUseCase.execute({ car_id: car.id, specification_id });

      expect(add).toHaveProperty("specification");
      expect(add.specification.length).toBeGreaterThanOrEqual(1);
   });

   it("should not be able to create specification for an non exists car", async () => {
      expect(async () => {
         const car_id = "1234";
         const specification_id = ["54321"];
         await createCarSpecificationUseCase.execute({ car_id, specification_id });
      }).rejects.toBeInstanceOf(AppError);
   });
});
