import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import cookierParser from "cookie-parser";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import listingRouter from "./routes/listing.route";
import { ErrorProps } from "./types";

dotenv.config();

mongoose
  .connect(process.env.MONGO || "")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(cookierParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    const error: ErrorProps = err as ErrorProps;
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";

    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  }
});

export default app;
