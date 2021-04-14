import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import ListCarsUseCase from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
   beforeEach(() => {
      carsRepositoryInMemory = new CarsRepositoryInMemory();
      listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
   });

   it("should be able to list all cars", async () => {
      const createCar = await carsRepositoryInMemory.create({
         brand: "Brand",
         name: "Car available",
         category_id: "1234123",
         daily_rate: 22,
         description: "Description car",
         fine_amount: 2,
         license_plate: "AVC-1234",
      });

      const cars = await listCarsUseCase.execute({});

      expect(cars).toEqual([createCar]);
   });

   it("should be able to list available cars by name", async () => {
      const createCar = await carsRepositoryInMemory.create({
         brand: "Brand_teste",
         name: "Car available1",
         category_id: "1234123",
         daily_rate: 22,
         description: "Description car1",
         fine_amount: 2,
         license_plate: "AVC-1234",
      });

      const cars = await listCarsUseCase.execute({ name: "Car available1" });

      expect(cars).toEqual([createCar]);
   });

   it("should be able to list available cars by brand", async () => {
      const createCar = await carsRepositoryInMemory.create({
         brand: "Brand_teste",
         name: "Car available1",
         category_id: "1234123",
         daily_rate: 22,
         description: "Description car1",
         fine_amount: 2,
         license_plate: "AVC-1234",
      });

      const cars = await listCarsUseCase.execute({ brand: "Brand_teste" });

      expect(cars).toEqual([createCar]);
   });

   it("should be able to list available cars by category", async () => {
      const createCar = await carsRepositoryInMemory.create({
         brand: "Brand_teste",
         name: "Car available1",
         category_id: "1234",
         daily_rate: 22,
         description: "Description car1",
         fine_amount: 2,
         license_plate: "AVC-1234",
      });

      const cars = await listCarsUseCase.execute({ category_id: "1234" });

      expect(cars).toEqual([createCar]);
   });
});
