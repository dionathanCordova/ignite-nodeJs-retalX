import { inject, injectable } from "tsyringe";
import ICreateUsersDTO from "../../dtos/ICreateUserDto";
import IUsersRepository from "../../repositories/IUsersRepository";
import { hash } from "bcrypt";
import { AppError } from "@shared/errors/AppError";

@injectable()
export default class CreateUserUseCases {
   constructor(
      @inject("UserRepository")
      private userRepository: IUsersRepository
   ) {}

   async execute({ email, driver_license, name, password }: ICreateUsersDTO): Promise<void> {
      const findUser = await this.userRepository.findByEmail(email);

      if (findUser) {
         throw new AppError("Email arlready in use", 401);
      }

      const passwordHash = await hash(password, 8);
      await this.userRepository.create({ password: passwordHash, name, driver_license, email });
   }
}
