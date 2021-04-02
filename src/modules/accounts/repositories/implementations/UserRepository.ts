import { getRepository, Repository } from "typeorm";
import Users from "../../entities/Users";
import IUsersRepository from "../IUsersRepository";
import ICreateUsersDTO from "../../dtos/ICreateUserDto";

class UserRepository implements IUsersRepository {
   private repository: Repository<Users>;

   constructor() {
      this.repository = getRepository(Users);
   }

   async findById(id: string): Promise<Users> {
      const user = await this.repository.findOne(id);
      return user;
   }

   async findByEmail(email: string): Promise<Users> {
      const user = await this.repository.findOne({ email });

      return user;
   }

   async create({ name, driver_license, email, password, id, avatar }: ICreateUsersDTO): Promise<void> {
      const user = this.repository.create({
         name,
         driver_license,
         email,
         password,
         avatar,
         id,
      });

      await this.repository.save(user);
   }
}

export default UserRepository;
