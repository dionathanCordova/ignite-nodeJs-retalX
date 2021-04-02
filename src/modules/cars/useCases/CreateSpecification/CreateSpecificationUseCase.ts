import { ICreateSpecificationDTO, ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateSpecificationUseCase {
   constructor(
      @inject("SpecificationRepository")
      private specificationRepository: ISpecificationRepository
   ) {}

   async execute({ name, description }: ICreateSpecificationDTO): Promise<void> {
      const findSpecification = await this.specificationRepository.findByName(name);

      if (findSpecification) {
         throw new AppError("Specification already exists", 401);
      }

      await this.specificationRepository.create({
         name,
         description,
      });
   }
}

export default CreateSpecificationUseCase;
