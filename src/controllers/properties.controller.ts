import { Request, Response } from "express";
import { appError } from "../errors/appError";
import { IPropertyRequest } from "../interfaces/properties";
import {
  createPropertyService,
  getPropertiesService,
} from "../services/properties.service";

const createPropertyController = async (req: Request, res: Response) => {
  const data: IPropertyRequest = req.body;
  if (data.address.zipCode.length > 8)
    throw new appError("the zipCode field must have up to 8 numbers");

  if (data.address.state.length > 2)
    throw new appError("the state field must have up to 2 numbers");

  const property = await createPropertyService(data);
  return res.status(201).send(property);
};

const getPropertiesController = async (req: Request, res: Response) => {
  const properties = await getPropertiesService();

  return res.status(200).json(properties);
};

export { createPropertyController, getPropertiesController };
