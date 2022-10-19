import { Properties } from "../entities/properties.entity";
import { IPropertyRequest } from "../interfaces/properties";
import AppDataSource from "../data-source";
import { appError } from "../errors/appError";
import { addresses } from "../entities/addresses.entity";
import { Categories } from "../entities/categories.entity";

const createPropertyService = async (
  data: IPropertyRequest
): Promise<Properties> => {
  const propertyRepository = AppDataSource.getRepository(Properties);
  const addressesRepository = AppDataSource.getRepository(addresses);
  const categoryRepository = AppDataSource.getRepository(Categories);

  const addressIsExists = await addressesRepository.findOneBy({
    district: data.address.district,
    zipCode: data.address.zipCode,
    number: data.address.number,
    city: data.address.city,
    state: data.address.state,
  });

  if (addressIsExists) {
    throw new appError("address already exists");
  }

  const category = await categoryRepository.findOneBy({
    id: data.categoryId,
  });

  if (!category) {
    throw new appError("Category is not exists", 404);
  }

  const address = addressesRepository.create(data.address);
  await addressesRepository.save(address);

  const property = propertyRepository.create({ ...data, category, address });
  await propertyRepository.save(property);

  return property;
};

const getPropertiesService = async (): Promise<Properties[]> => {
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const properties = await propertiesRepository.find({
    relations: {
      category: true,
    },
  });

  return properties;
};

export { createPropertyService, getPropertiesService };
