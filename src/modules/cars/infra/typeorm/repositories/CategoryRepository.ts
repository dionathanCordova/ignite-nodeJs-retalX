import { ICategoryRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoryRepository";
import { getRepository, Repository } from "typeorm";
import Category from "../entities/Category";

class CategoryRepository implements ICategoryRepository {
   private repository: Repository<Category>;

   constructor() {
      this.repository = getRepository(Category);
   }

   async create({ description, name }: ICreateCategoryDTO): Promise<void> {
      const category = this.repository.create({
         name,
         description,
      });

      await this.repository.save(category);
   }

   async list(): Promise<Category[]> {
      const categories = await this.repository.find();
      return categories;
   }

   async findByName(name: string): Promise<Category> {
      const category = await this.repository.findOne({ name });

      return category;
   }
}

export default CategoryRepository;
