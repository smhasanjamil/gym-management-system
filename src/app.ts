import cors from "cors";
import express, { Application, Request, Response } from "express";

import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import { UserRoutes } from "./app/modules/user/user.route";
import { ClassScheduleRoutes } from "./app/modules/classSchedule/classSchedule.route";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"] }));

// application routes
// app.use("/api/v1", router);
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/class", ClassScheduleRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("GYM Management System is running!");
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
