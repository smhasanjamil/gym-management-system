import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

// Create User
const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

export const userServices = {
  createUserIntoDB,
};
