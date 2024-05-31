import { Request, Response, NextFunction } from "express";
import brcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { errorHandler } from "../utils/error";

type RestProps = {
  password: string;
  _doc: {
    email: string;
    password: string;
  };
};

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

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = brcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET || "");

    const { password: pass, ...rest }: RestProps = validUser.toObject();

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};
