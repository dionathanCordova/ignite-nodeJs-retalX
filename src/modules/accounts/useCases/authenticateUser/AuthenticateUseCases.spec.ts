import { AppError } from "@shared/errors/AppError";
import ICreateUsersDTO from "../../dtos/ICreateUserDto";
import UsersRepositotyInMemory from "../../repositories/in-memory/UsersRepositoryInMemory";
import CreateUserUseCases from "../CreateUser/CreateUserUseCases";
import AuthenticateUseCases from "./AuthenticateUseCases";

let authenticateUseCases: AuthenticateUseCases;
let usersRepositotyInMemory: UsersRepositotyInMemory;
let createUserUseCase: CreateUserUseCases;

describe("Authenticate user", () => {
   beforeEach(() => {
      usersRepositotyInMemory = new UsersRepositotyInMemory();
      authenticateUseCases = new AuthenticateUseCases(usersRepositotyInMemory);
      createUserUseCase = new CreateUserUseCases(usersRepositotyInMemory);
   });

   it("should be able to authenticate an user", async () => {
      const user: ICreateUsersDTO = {
         driver_license: "000123",
         email: "user@gmail.com",
         password: "1234",
         name: "User teste",
      };

      await createUserUseCase.execute(user);

      const result = await authenticateUseCases.execute({
         email: user.email,
         password: user.password,
      });

      expect(result).toHaveProperty("token");
   });

   it("should not be able to authenticate a non users existent", async () => {
      expect(async () => {
         await authenticateUseCases.execute({
            email: "non",
            password: "non",
         });
      }).rejects.toBeInstanceOf(AppError);
   });

   it("should not be able to authenticate user with incorret password", () => {
      expect(async () => {
         const user: ICreateUsersDTO = {
            driver_license: "000123",
            email: "user@gmail.com",
            password: "1234",
            name: "User teste",
         };

         await createUserUseCase.execute(user);

         await authenticateUseCases.execute({
            email: user.email,
            password: "non",
         });
      }).rejects.toBeInstanceOf(AppError);
   });
});
