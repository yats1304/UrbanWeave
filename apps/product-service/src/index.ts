import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";
import { isAuthenticated } from "./middleware/authMiddleware.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true,
  }),
);

app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestampt: Date.now(),
  });
});

app.get("/test", isAuthenticated, (req: Request, res: Response) => {
  res.json({
    message: "Product Service is Authenticated!",
    userId: req.userId,
  });
});

app.listen(8000, () => {
  console.log("Product service is running on PORT 8000");
});
