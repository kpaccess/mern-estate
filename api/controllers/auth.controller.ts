import { Request, Response, NextFunction } from "express";
import brcryptjs from "bcryptjs";
import User from "../models/user.model";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;
  const salt = await brcryptjs.genSalt(10);
  const hashedPassword = brcryptjs.hashSync(password, salt);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (err: unknown) {
    next(err);
  }
};
