import { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
   name: string;
   description: string;
}

@injectable()
export default class CreateCategoryUseCase {
   constructor(
      @inject("CategoryRepository")
      private categoriesRepository: ICategoryRepository
   ) {}

   async execute({ description, name }: IRequest): Promise<void> {
      const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

      if (categoryAlreadyExists) {
         throw new AppError("Category already exists", 401);
      }

      this.categoriesRepository.create({ name, description });
   }
}
