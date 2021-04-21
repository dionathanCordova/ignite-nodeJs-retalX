import Category from "@modules/cars/infra/typeorm/entities/Category";
import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

@injectable()
export default class ListCategoriesUseCase {
   constructor(
      @inject("CategoryRepository")
      private categoriesRepository: ICategoryRepository
   ) {}

   async execute(): Promise<Category[]> {
      const categories = await this.categoriesRepository.list();
      return categories;
   }
}
