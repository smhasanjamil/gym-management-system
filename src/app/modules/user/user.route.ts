import { Router } from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidations } from "./user.validation";

const router = Router();

// router.post(
//   "/create-user",
//   validateRequest(userValidations.createUserValidationSchema),
//   userControllers.createUser
// );

export const UserRoutes = router;
