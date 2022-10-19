import { Router } from "express";
import {
  createSchedulesVisitController,
  getSchedulesInPropertiesController,
} from "../controllers/schedules.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const schedulesRouter = Router();

schedulesRouter.post("", ensureAuthMiddleware, createSchedulesVisitController);
schedulesRouter.get(
  "/properties/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  getSchedulesInPropertiesController
);

export default schedulesRouter;
