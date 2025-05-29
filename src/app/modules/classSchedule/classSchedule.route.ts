import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { classScheduleValidations } from "./classSchedule.validation";
import { classScheduleControllers } from "./classSchedule.controller";

const router = Router();

router.post(
  "/create",
  validateRequest(classScheduleValidations.classScheduleSchema),
  classScheduleControllers.createClassSchedule
);

export const ClassScheduleRoutes = router;
