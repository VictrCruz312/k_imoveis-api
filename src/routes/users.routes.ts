import { Router } from "express";
import {
  createUserControler,
  deleteUserController,
  getUsersController,
  updateUserController,
} from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";
import ensureKeysMiddleware from "../middlewares/ensureKeys.middleware";

const userRouter = Router();

userRouter.post("", createUserControler);
userRouter.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  getUsersController
);
userRouter.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureKeysMiddleware,
  updateUserController
);
userRouter.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  deleteUserController
);

export default userRouter;
