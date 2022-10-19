import { Request, Response } from "express";
import { IPropertyRequest } from "../interfaces/properties";
import { createPropertyService } from "../services/properties.service";

const createPropertyController = async (req: Request, res: Response) => {
  const data: IPropertyRequest = req.body;
  const property = await createPropertyService(data);
  return res.status(201).send(property);
};

export { createPropertyController };
