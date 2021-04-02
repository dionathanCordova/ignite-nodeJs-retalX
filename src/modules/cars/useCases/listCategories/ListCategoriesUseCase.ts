import { inject, injectable } from "tsyringe";
import Category from "../../entities/Category";
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
