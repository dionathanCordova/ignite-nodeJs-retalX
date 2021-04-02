import { inject, injectable } from "tsyringe";
import IUsersRepository from "../../repositories/IUsersRepository";
import { deleteFile } from "../../../../utils/file";

interface IRequest {
   user_id: string;
   avatarFile: string;
}

@injectable()
export default class UpdateUserAvatarUseCase {
   constructor(
      @inject("UserRepository")
      private userRepository: IUsersRepository
   ) {}
   async execute({ avatarFile, user_id }: IRequest): Promise<void> {
      const user = await this.userRepository.findById(user_id);

      if (user.avatar) {
         await deleteFile(`./tmp/avatar/${user.avatar}`);
      }

      user.avatar = avatarFile;
      await this.userRepository.create(user);
   }
}
