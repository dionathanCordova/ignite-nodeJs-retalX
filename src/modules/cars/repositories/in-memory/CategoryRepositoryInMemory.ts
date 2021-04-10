// import Category from "../../entities/Category";
import Category from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoryRepository, ICreateCategoryDTO } from "../ICategoryRepository";

class CategoryRepositoryInMemory implements ICategoryRepository {
   catagories: Category[] = [];

   async findByName(name: string): Promise<Category> {
      return this.catagories.find((catagory) => catagory.name === name);
   }

   async list(): Promise<Category[]> {
      return this.catagories;
   }

   async create({ description, name }: ICreateCategoryDTO): Promise<void> {
      const category = new Category();

      Object.assign(category, {
         description,
         name,
      });

      this.catagories.push(category);
   }
}

export default CategoryRepositoryInMemory;
