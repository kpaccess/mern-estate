import { Request, Response, NextFunction } from "express";
import Listing from "../models/listing.model";
import { errorHandler } from "../utils/error";
import mongoose from "mongoose";

interface AuthenticateRequest extends Request {
  user?: {
    id?: string;
  };
}

export const createListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(200).json({
      success: true,
      listing,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (
  req: AuthenticateRequest,
  res: Response,
  next: NextFunction
) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }

  if (req.user && req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Listing has been deleted" });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (
  req: AuthenticateRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(errorHandler(400, "Invalid listing ID"));
  }

  const listing = await Listing.findById(id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }

  if (req?.user?.id !== listing.userRef.toString()) {
    return next(errorHandler(401, "You can only update your own listings"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
