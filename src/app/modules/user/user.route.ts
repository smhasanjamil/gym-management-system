import { Router } from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidations } from "./user.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../auth/auth.constant";

const router = Router();

// router.post(
//   "/create-user",
//   validateRequest(userValidations.createUserValidationSchema),
//   userControllers.createUser
// );

router.post(
  "/create-trainer",
  auth(USER_ROLE.admin),
  validateRequest(userValidations.createUserValidationSchema),
  userControllers.createTrainer
);

export const UserRoutes = router;
