import { getRepository, Repository } from "typeorm";
import Specification from "../../entities/Specification";

import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
   private repository: Repository<Specification>;

   constructor() {
      this.repository = getRepository(Specification);
   }

   async findByName(name: string): Promise<Specification> {
      const specification = this.repository.findOne({ name });

      return specification;
   }

   async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
      const specification = this.repository.create({
         name,
         description,
         created_at: new Date(),
      });

      await this.repository.save(specification);
   }
}

export default SpecificationRepository;