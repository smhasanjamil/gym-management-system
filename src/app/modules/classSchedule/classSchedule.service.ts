import { UserModel } from "../user/user.model";
import { IClassSchedule } from "./classSchedule.interface";
import { ClassScheduleModel } from "./classSchedule.model";

const MAX_CLASSES_PER_DAY = 5;
const DEFAULT_DURATION = 120;

// Create Class
const createClassScheduleIntoDB = async (inputData: IClassSchedule) => {
  // 1. Check if trainer exists
  const trainerExists = await UserModel.exists({ _id: inputData.trainer });
  if (!trainerExists) {
    throw new Error("Trainer not found in database.");
  }

  const duration = inputData.duration ?? DEFAULT_DURATION;
  const classDate = new Date(inputData.date);

  // Check how many classes already scheduled on that day
  const startOfDay = new Date(classDate);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(classDate);
  endOfDay.setUTCHours(23, 59, 59, 999);

  const classCount = await ClassScheduleModel.countDocuments({
    date: { $gte: startOfDay, $lte: endOfDay },
  });

  if (classCount >= MAX_CLASSES_PER_DAY) {
    throw new Error(`Only ${MAX_CLASSES_PER_DAY} classes allowed per day.`);
  }

  //  Create class 
  const result = await ClassScheduleModel.create({
    ...inputData,
    duration,
  });

  return result;
};

export const classScheduleServices = {
  createClassScheduleIntoDB,
};
