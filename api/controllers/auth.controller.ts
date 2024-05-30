import { Request, Response } from "express";
import brcryptjs from "bcryptjs";
import User from "../models/user.model";

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = brcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (err: any) {
    console.log(err);
    res.status(500).json(err.message);
  }
};
