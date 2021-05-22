import Specification from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";

export default class SpecificationInMemory implements ISpecificationRepository {
   specification: Specification[] = [];

   async findByName(name: string): Promise<Specification> {
      return this.specification.find((spec) => spec.name === name);
   }

   async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
      const spec = new Specification();

      Object.assign(spec, {
         name,
         description,
      });

      this.specification.push(spec);

      return spec;
   }

   async findByIds(ids: string[]): Promise<Specification[]> {
      return this.specification.filter((spec) => ids.includes(spec.id));
   }
}
