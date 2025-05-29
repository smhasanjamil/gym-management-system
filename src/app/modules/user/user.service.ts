import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

// Create User
const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

// Update Trainee
const updateTraineeById = async (id: string, data: Partial<TUser>) => {
  const trainee = await UserModel.findOneAndUpdate(
    { _id: id, role: "trainee" },
    data,
    { new: true }
  );
  if (!trainee) throw new Error("Trainee not found");
  return trainee;
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

// Delete Trainee
const deleteTraineeById = async (id: string) => {
  const result = await UserModel.findOneAndDelete({ _id: id, role: "trainee" });
  if (!result) throw new Error("Trainee not found");
  return result;
};

// Delete Trainer
const deleteTrainerById = async (id: string) => {
  const result = await UserModel.findOneAndDelete({ _id: id, role: "trainer" });
  if (!result) throw new Error("Trainer not found");
  return result;
};

export const userServices = {
  createUserIntoDB,
  updateTraineeById,
  updateTrainerById,
  deleteTrainerById,
  deleteTraineeById,
};
