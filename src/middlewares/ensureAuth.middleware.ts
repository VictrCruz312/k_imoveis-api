import { NextFunction, Request, Response } from "express";
import jwt, { decode } from "jsonwebtoken";
import "dotenv/config";

const ensureAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization: string = req.headers.authorization as string;

  if (!authorization) {
    res.status(401).json({ message: "permission denied" });
  }
  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "permission denied" });
    }
    req.body.permission = { isAdm: decoded.isAdm, idToken: decoded.sub };

    return next();
  });
};

export default ensureAuthMiddleware;
