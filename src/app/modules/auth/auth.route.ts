import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import { authControllers } from "./auth.controller";
import { userValidations } from "../user/user.validation";
import { userControllers } from "../user/user.controller";

const router = Router();

router.post(
  "/register",
  validateRequest(userValidations.createUserValidationSchema),
  userControllers.createUser
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  authControllers.loginUser
);

router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenZodSchema),
  authControllers.refreshToken
);

export const AuthRoutes = router;
