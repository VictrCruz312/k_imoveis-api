import { NextFunction, Request, Response } from "express";

const ensureKeysMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body;

  const keys = Object.keys(user);
  keys.forEach((key) => {
    if (key === "isActive" || key === "id" || key === "isAdm") {
      return res
        .status(401)
        .json({ message: "unable to update, isAdm, isActive or id" });
    }
  });

  next();
};

export default ensureKeysMiddleware;
