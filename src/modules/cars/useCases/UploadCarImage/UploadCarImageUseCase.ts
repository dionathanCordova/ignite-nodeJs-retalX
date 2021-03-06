import ICarImageRepository from "@modules/cars/repositories/ICarImageRepoitory";
import { inject, injectable } from "tsyringe";

interface IRequest {
   car_id: string;
   images_name: string[];
}

@injectable()
export default class UploadCarImageUseCase {
   constructor(
      @inject("CarImageRepository")
      private carImageRepository: ICarImageRepository
   ) {}

   async execute({ car_id, images_name }: IRequest): Promise<void> {
      images_name.map(async (image) => {
         await this.carImageRepository.create(car_id, image);
      });
   }
}
