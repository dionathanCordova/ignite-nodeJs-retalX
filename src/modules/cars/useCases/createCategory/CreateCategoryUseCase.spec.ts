import { AppError } from "@shared/errors/AppError";
import CategoryRepositoryInMemory from "../../repositories/in-memory/CategoryRepositoryInMemory";
import CreateCategoryUseCase from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoryRepositoryInMemory;

describe("Create Category", () => {
   beforeEach(() => {
      categoriesRepositoryInMemory = new CategoryRepositoryInMemory();
      createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
   });

   it("shold be able to create category", async () => {
      const category = {
         name: "Create category name teste",
         description: "Description teste",
      };

      await createCategoryUseCase.execute({
         name: category.name,
         description: category.description,
      });

      const createdCategory = await categoriesRepositoryInMemory.findByName(category.name);

      expect(createdCategory).toHaveProperty("id");
   });

   it("shold not be able to create category with same name", async () => {
      expect(async () => {
         const category = {
            name: "Create category name teste",
            description: "Description teste",
         };

         await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
         });

         await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
         });
      }).rejects.toBeInstanceOf(AppError);
   });
});
