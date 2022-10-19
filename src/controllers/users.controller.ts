import { Request, Response } from "express";
import { IUserRequest, IUserUpdate } from "../interfaces/users";
import {
  createUserService,
  deleteUserService,
  getUsersService,
  updateUserService,
} from "../services/users.service";

const createUserControler = async (req: Request, res: Response) => {
  const data: IUserRequest = req.body;

  const userCreated = await createUserService(data);

  return res.status(201).json(userCreated);
};

const getUsersController = async (req: Request, res: Response) => {
  const users = await getUsersService();

  return res.status(200).json(users);
};

const updateUserController = async (req: Request, res: Response) => {
  const data: IUserUpdate = req.body;
  const { permission } = req.body;
  const { id } = req.params;

  const userUpdated = await updateUserService(data, id, permission);

  return res.status(200).json(userUpdated);
};

const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteUserService(id);
  return res.status(204).json();
};

export {
  createUserControler,
  getUsersController,
  updateUserController,
  deleteUserController,
};
