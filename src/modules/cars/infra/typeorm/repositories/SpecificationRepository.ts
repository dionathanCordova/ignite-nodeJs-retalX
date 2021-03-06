import { ICreateSpecificationDTO, ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { getRepository, Repository } from "typeorm";
import Specification from "../entities/Specification";

class SpecificationRepository implements ISpecificationRepository {
   private repository: Repository<Specification>;

   constructor() {
      this.repository = getRepository(Specification);
   }

   async findByName(name: string): Promise<Specification> {
      const specification = this.repository.findOne({ name });

      return specification;
   }

   async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
      const specification = this.repository.create({
         name,
         description,
         created_at: new Date(),
      });

      return this.repository.save(specification);
   }

   async findByIds(ids: string[]): Promise<Specification[]> {
      return this.repository.findByIds(ids);
   }
}

export default SpecificationRepository;
