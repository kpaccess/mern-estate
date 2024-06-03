import { NextFunction, Request, Response } from "express";
import { errorHandler } from "./error";
import jwt from "jsonwebtoken";

interface AuthenticateRequest extends Request {
  user?: {
    id: string;
  };
}

export const verifyToken = async (
  req: AuthenticateRequest,
  res: Response,
  next: NextFunction
) => {
  // to get value from cookie we needt to install cookie parser

  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "Not authorized"));

  jwt.verify(token, process.env.JWT_SECRET || " ", (err: any, user: any) => {
    if (err) return next(errorHandler(403, "Forbidden"));
    req.user = user;
    next();
  });
};
