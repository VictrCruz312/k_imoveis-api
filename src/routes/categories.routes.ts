import { Router } from "express";
import {
  createCategoryController,
  getCategoriesController,
  getPropertiesInCategoryController,
} from "../controllers/categories.controller";
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
categoriesRouter.get("/:id/properties", getPropertiesInCategoryController);

export default categoriesRouter;
