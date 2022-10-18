import { NextFunction, Request, Response } from "express";

const ensureIsAdmMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.permission.isAdm) {
    return res.status(403).json({ message: "permission denied is not adm" });
  }

  return next();
};

export default ensureIsAdmMiddleware;
