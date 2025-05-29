import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { classScheduleValidations } from "./classSchedule.validation";
import { classScheduleControllers } from "./classSchedule.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../auth/auth.constant";

const router = Router();

router.post(
  "/create",
  auth(USER_ROLE.admin),
  validateRequest(classScheduleValidations.classScheduleSchema),
  classScheduleControllers.createClassSchedule
);

export const ClassScheduleRoutes = router;
