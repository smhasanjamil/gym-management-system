import { USER_ROLE } from "../auth/auth.constant";

export type TUser = {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "trainer" | "trainee";
};

export type TUserRole = keyof typeof USER_ROLE;
