import ICreateUsersDTO from "../dtos/ICreateUserDto";
import Users from "../entities/Users";

export default interface IUsersRepository {
   create(data: ICreateUsersDTO): Promise<void>;
   findByEmail(email: string): Promise<Users>;
   findById(id: string): Promise<Users>;
}
