import Category from "../entities/Category";

interface ICreateCategoryDTO {
   name: string;
   description: string;
}

interface ICategoryRepository {
   findByName(name: string): Promise<Category>;
   list(): Promise<Category[]>;
   create({ description, name }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoryRepository, ICreateCategoryDTO };
