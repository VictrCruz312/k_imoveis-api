import AppDataSource from "../data-source";
import { Categories } from "../entities/categories.entity";
import { appError } from "../errors/appError";
import { ICategoryRequest } from "../interfaces/categories";

const createCategoryService = async (name: string): Promise<Categories> => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const categoryIsExists = await categoriesRepository.findOneBy({
    name,
  });

  if (categoryIsExists) {
    throw new appError("category is already exists");
  }
  const category = categoriesRepository.create({ name });
  await categoriesRepository.save(category);

  return category;
};

const getCategoriesService = async (): Promise<Categories[]> => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const categories = await categoriesRepository.find();

  return categories;
};

export { createCategoryService, getCategoriesService };
