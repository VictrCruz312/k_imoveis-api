import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import {
  IAuthPermission,
  IUser,
  IUserRequest,
  IUserUpdate,
} from "../interfaces/users";
import { hash } from "bcrypt";
import { appError } from "../errors/appError";

const createUserService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserRequest): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new appError("Email already exists");
  }

  const hashPassword = await hash(password, 10);

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = hashPassword;
  user.isAdm = isAdm;

  userRepository.create(user);
  await userRepository.save(user);

  const { password: pwd, ...newUser } = user;

  return newUser;
};

const getUsersService = async (): Promise<IUser[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();
  const usersNotPassword = users.map((user) => {
    const { password, ...newUser } = user;
    return newUser;
  });

  return usersNotPassword;
};

const updateUserService = async (
  { name, email, password }: IUserUpdate,
  id: string,
  permission: IAuthPermission
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: id });
  if (!user) {
    throw new appError("User not found");
  }

  if (!permission.isAdm) {
    if (user.id !== permission.idToken) {
      throw new appError(
        "permission denied to update another user must be admin"
      );
    }
  }

  const hashPassword = password ? await hash(password, 10) : undefined;

  await userRepository.update(id, {
    name: name || user?.name,
    email: email || user?.email,
    password: hashPassword || user?.password,
  });

  const userUpdated = await userRepository.findOneBy({ id: id });

  if (!userUpdated) {
    throw new appError("User not found");
  }

  return userUpdated;
};

const deleteUserService = async (id: string): Promise<{ message: string }> => {
  const userRepository = AppDataSource.getRepository(User);
  const userToDelete = await userRepository.findOneBy({ id });
  if (!userToDelete) {
    throw new appError("user not found to delete");
  }

  if (!userToDelete.isActive) {
    throw new appError("user not found to delete", 400);
  }
  await userRepository.update(id, {
    isActive: false,
  });
  return { message: "user deleted" };
};

export {
  createUserService,
  getUsersService,
  updateUserService,
  deleteUserService,
};
