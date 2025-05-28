import cors from "cors";
import express, { Application, Request, Response } from "express";

import cookieParser from "cookie-parser";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"] }));

app.get("/", (req: Request, res: Response) => {
  res.send("GYM Management System is running!");
});

export default app;
