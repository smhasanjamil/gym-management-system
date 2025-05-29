import { ObjectId } from "mongoose";

export type TAuth = {
  email: string;
  password: string;
};

// export interface IJwtPayload {
//   id: string;
//   name: string;
//   email: string;
//   phoneNumber: string;
//   role?: "user" | "admin";
//   isActive: boolean;
// }
