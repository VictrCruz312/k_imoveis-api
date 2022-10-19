import { Router } from "express";
import { createPropertyController } from "../controllers/properties.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const propertiesRouter = Router();

propertiesRouter.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  createPropertyController
);

export default propertiesRouter;
