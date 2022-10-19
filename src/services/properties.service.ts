import { Properties } from "../entities/properties.entity";
import { IPropertyRequest } from "../interfaces/properties";
import AppDataSource from "../data-source";
import { appError } from "../errors/appError";
import { addresses } from "../entities/addresses.entity";

const createPropertyService = async (
  data: IPropertyRequest
): Promise<Properties> => {
  const propertyRepository = AppDataSource.getRepository(Properties);
  const addressesRepository = AppDataSource.getRepository(addresses);

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

  const adress = addressesRepository.create(data.address);
  await addressesRepository.save(adress);

  const property = propertyRepository.create(data);
  await propertyRepository.save(property);

  return property;
};

export { createPropertyService };
