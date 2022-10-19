import { Request, Response } from "express";
import { ICategoryRequest } from "../interfaces/categories";
import {
  createCategoryService,
  getCategoriesService,
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

export { createCategoryController, getCategoriesController };
