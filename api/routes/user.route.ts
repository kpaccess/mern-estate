import { verifyToken } from "./../utils/verifyUser";
import express from "express";
import { test, updateUser, deleteUser } from "../controllers/user.controller";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
