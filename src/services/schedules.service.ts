import AppDataSource from "../data-source";
import { Properties } from "../entities/properties.entity";
import { SchedulesUsersProperties } from "../entities/schedulesUsersProperties.entity";
import { User } from "../entities/user.entity";
import { appError } from "../errors/appError";
import { IScheduleRequest } from "../interfaces/schedules";

const createSchedulesVisitService = async (
  data: IScheduleRequest,
  idToken: string
): Promise<string> => {
  const hour = parseInt(data.hour.split(":")[0]);

  if (hour >= 18 || hour < 8) {
    throw new appError(
      "It is only possible to schedule a visit from 08:00 to 18:00 hours",
      400
    );
  }
  const scheduleRepository = AppDataSource.getRepository(
    SchedulesUsersProperties
  );
  const userRepository = AppDataSource.getRepository(User);
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const user = await userRepository.findOneBy({ id: idToken });
  const property = await propertiesRepository.findOneBy({
    id: data.propertyId,
  });

  if (!user || !property) {
    throw new appError("property not found", 404);
  }

  const schedulesVisit = await scheduleRepository.findOneBy({
    hour: data.hour,
  });

  if (schedulesVisit) {
    throw new appError("visiting hours unavailable");
  }

  await scheduleRepository.save({
    ...data,
    user,
    property: property,
  });

  return "schedule defined";
};

const getSchedulesInPropertiesService = async (
  id: string
): Promise<SchedulesUsersProperties[]> => {
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const schedulesProperty = await propertiesRepository.findOne({
    where: {
      id,
    },
    relations: { schedulesUsersProperties: true },
  });

  if (!schedulesProperty) {
    throw new appError("Invalid id in property", 404);
  }

  return schedulesProperty.schedulesUsersProperties!;
};

export { createSchedulesVisitService, getSchedulesInPropertiesService };
