import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

// Create User
const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

// Update Trainer
const updateTrainerById = async (id: string, data: Partial<TUser>) => {
  const trainer = await UserModel.findOneAndUpdate(
    { _id: id, role: "trainer" },
    data,
    { new: true }
  );
  if (!trainer) throw new Error("Trainer not found");
  return trainer;
};

// Delete Trainer
const deleteTrainerById = async (id: string) => {
  const result = await UserModel.findOneAndDelete({ _id: id, role: "trainer" });
  if (!result) throw new Error("Trainer not found");
  return result;
};

export const userServices = {
  createUserIntoDB,
  updateTrainerById,
  deleteTrainerById,
};
