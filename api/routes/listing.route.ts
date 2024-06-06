import express from "express";
import {
  createListing,
  deleteListing,
} from "../controllers/listing.controller";
import { verifyToken } from "../utils/verifyUser";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);

export default router;
