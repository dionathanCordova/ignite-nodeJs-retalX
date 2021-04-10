import Users from "@modules/accounts/infra/typeorm/entities/Users";
import ICreateUserDto from "../../dtos/ICreateUserDto";
import IUsersRepository from "../IUsersRepository";

class UsersRepositotyInMemory implements IUsersRepository {
   users: Users[] = [];

   async create({ driver_license, email, name, password }: ICreateUserDto): Promise<void> {
      const user = new Users();

      Object.assign(user, {
         driver_license,
         email,
         name,
         password,
      });

      this.users.push(user);
   }
   async findByEmail(email: string): Promise<Users> {
      return this.users.find((user) => user.email === email);
   }

   async findById(id: string): Promise<Users> {
      return this.users.find((user) => user.id === id);
   }
}

export default UsersRepositotyInMemory;
