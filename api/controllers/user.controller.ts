import bcryptjs from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../utils/error";
import User from "../models/user.model";
import Listing from "../models/listing.model";

interface AuthenticateRequest extends Request {
  user?: {
    id?: string;
  };
}

export const test = (req: Request, res: Response) => {
  res.json({ message: "API route is working" });
};

export const updateUser = async (
  req: AuthenticateRequest,
  res: Response,
  next: NextFunction
) => {
  if (req?.user?.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account"));
  }

  try {
    if (req.body.password) {
      const salt = await bcryptjs.genSalt(10);
      req.body.password = bcryptjs.hashSync(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser!.toObject();

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: AuthenticateRequest,
  res: Response,
  next: NextFunction
) => {
  if (req?.user?.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account"));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json({ message: "user has been deleted" });
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (
  req: AuthenticateRequest,
  res: Response,
  next: NextFunction
) => {
  if (req?.user?.id !== req.params.id) {
    return next(errorHandler(401, "You can only view your own listings"));
  }

  try {
    const listings = await Listing.find({ userRef: req.params.id });
    console.log(" listings: ", listings);
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
