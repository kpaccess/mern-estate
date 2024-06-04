import { Request, Response, NextFunction } from "express";
import Listing from "../models/listing.model";

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
