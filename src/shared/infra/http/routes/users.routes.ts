import { Router } from "express";
import multer from "multer";
import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensureAuthenticate";

import uploadConfig from "@config/upload";
import CreateUserController from "@modules/accounts/useCases/CreateUser/CreateUserController";
import UpdateUserAvatarController from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const userRoute = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoute.post("/", createUserController.handle);
userRoute.patch("/avatar", ensureAuthenticate, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export default userRoute;
