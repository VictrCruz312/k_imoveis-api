import { Router } from "express";
import {
  createPropertyController,
  getPropertiesController,
} from "../controllers/properties.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const propertiesRouter = Router();

propertiesRouter.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  createPropertyController
);
propertiesRouter.get("", getPropertiesController);

export default propertiesRouter;
