import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { classScheduleValidations } from "./classSchedule.validation";
import { classScheduleControllers } from "./classSchedule.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../auth/auth.constant";
import { bookingControllers } from "../bookingClass/bookingClass.controller";
import { bookingClassValidations } from "../bookingClass/bookingClass.validation";

const router = Router();

router.post(
  "/create",
  auth(USER_ROLE.admin),
  validateRequest(classScheduleValidations.classScheduleSchema),
  classScheduleControllers.createClassSchedule
);

router.post(
  "/book-class",
  auth(USER_ROLE.trainee),
  validateRequest(bookingClassValidations.bookingClassSchema),
  bookingControllers.createBooking
);

router.get(
  "/trainer/:trainerId",
  auth(USER_ROLE.admin, USER_ROLE.trainer),
  classScheduleControllers.getClassesByTrainer
);

export const ClassScheduleRoutes = router;
