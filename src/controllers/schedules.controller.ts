import { Request, Response } from "express";
import { IScheduleRequest } from "../interfaces/schedules";
import {
  createSchedulesVisitService,
  getSchedulesInPropertiesService,
} from "../services/schedules.service";

const createSchedulesVisitController = async (req: Request, res: Response) => {
  const { date, userId, propertyId, hour, permission } = req.body;
  const data: IScheduleRequest = { date, userId, propertyId, hour };
  const idToken: string = permission.idToken;

  const visit = await createSchedulesVisitService(data, idToken);

  return res.status(201).json({ message: visit });
};

const getSchedulesInPropertiesController = async (
  req: Request,
  res: Response
) => {
  const idProperty: string = req.params.id;

  const schedulesProperty = await getSchedulesInPropertiesService(idProperty);

  return res.status(200).json({ schedules: schedulesProperty });
};

export { createSchedulesVisitController, getSchedulesInPropertiesController };
