import { IUser, IUserLogin, IUserRequest } from "../interfaces/users";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { appError } from "../errors/appError";

const loginService = async (data: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const userDb = await userRepository.findOneBy({ email: data.email });

  if (!userDb || !userDb.isActive) {
    throw new appError("Invalid email or password", 403);
  }

  const passwordIsValid = await compare(data.password, userDb.password);

  if (!passwordIsValid) {
    throw new appError("Invalid email or password", 403);
  }

  const token = jwt.sign(
    { isAdm: userDb.isAdm },
    process.env.SECRET_KEY as string,
    { expiresIn: "24h", subject: userDb.id }
  );

  return token;
};

export { loginService };
