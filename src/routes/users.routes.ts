import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

import CreateUserController from "../modules/accounts/useCases/CreateUser/CreateUserController";
import UpdateUserAvatarController from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const userRoute = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoute.use(ensureAuthenticate);
userRoute.post("/", createUserController.handle);
userRoute.patch("/avatar", uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export default userRoute;
