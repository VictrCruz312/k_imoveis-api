import { Request, Response } from "express";
import {
  createCategoryService,
  getCategoriesService,
  getPropertiesInCategoryService,
} from "../services/categories.service";

const createCategoryController = async (req: Request, res: Response) => {
  const name: string = req.body.name;
  const category = await createCategoryService(name);
  return res.status(201).json(category);
};

const getCategoriesController = async (req: Request, res: Response) => {
  const categories = await getCategoriesService();
  return res.status(200).json(categories);
};

const getPropertiesInCategoryController = async (
  req: Request,
  res: Response
) => {
  const categoryId: string = req.params.id;

  const categoryProperties = await getPropertiesInCategoryService(categoryId);

  return res.status(200).json(categoryProperties);
};

export {
  createCategoryController,
  getCategoriesController,
  getPropertiesInCategoryController,
};
