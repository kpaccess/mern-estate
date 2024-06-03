import { verifyToken } from "./../utils/verifyUser";
import express from "express";
import { test, updateUser } from "../controllers/user.controller";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);

export default router;
