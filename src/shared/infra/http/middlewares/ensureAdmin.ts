import { NextFunction, Request, Response } from "express";
import UserRepository from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
   const { id } = request.user;
   const usersRepository = new UserRepository();

   const user = await usersRepository.findById(id);

   if (!user.is_admin) {
      throw new AppError("User is not an admin user");
   }

   next();
}
