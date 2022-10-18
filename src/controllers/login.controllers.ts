import { Request, Response } from "express";
import { appError } from "../errors/appError";
import { IUserLogin } from "../interfaces/users";
import { loginService } from "../services/login.services";

const loginController = async (req: Request, res: Response) => {
  const data: IUserLogin = req.body;

  const token: string = await loginService(data);
  return res.status(200).json({ token: token });
};

export { loginController };
