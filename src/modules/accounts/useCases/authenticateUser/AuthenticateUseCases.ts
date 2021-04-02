import { inject, injectable } from "tsyringe";
import IUsersRepository from "../../repositories/IUsersRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
   email: string;
   password: string;
}

interface IResponse {
   user: {
      name: string;
      email: string;
   };
   token: string;
}

@injectable()
export default class AuthenticateUseCases {
   constructor(
      @inject("UserRepository")
      private usersRepository: IUsersRepository
   ) {}

   async execute({ email, password }: IRequest): Promise<IResponse> {
      const user = await this.usersRepository.findByEmail(email);

      if (!user) {
         throw new AppError("Email or password incorrect", 401);
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
         throw new AppError("Email or password incorrect", 401);
      }

      const token = sign({}, "69c6e4a394b794ac45a4ca63761bff01", {
         subject: user.id,
         expiresIn: "1d",
      });

      const returnData: IResponse = {
         token,
         user: {
            name: user.name,
            email: user.email,
         },
      };

      return returnData;
   }
}
