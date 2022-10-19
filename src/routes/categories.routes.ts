import { Router } from "express";
import {
  createCategoryController,
  getCategoriesController,
} from "../controllers/categories.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const categoriesRouter = Router();

categoriesRouter.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  createCategoryController
);

categoriesRouter.get("", getCategoriesController);

export default categoriesRouter;
