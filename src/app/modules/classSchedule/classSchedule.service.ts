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
  const newStart = new Date(inputData.date);
  const newEnd = new Date(newStart.getTime() + duration * 60000);

  // Start and end of the same day (UTC)
  const startOfDay = new Date(newStart);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(newStart);
  endOfDay.setUTCHours(23, 59, 59, 999);

  // Get classes on that day
  const existingClasses = await ClassScheduleModel.find({
    date: { $gte: startOfDay, $lte: endOfDay },
  });

  if (existingClasses.length >= MAX_CLASSES_PER_DAY) {
    throw new Error(`Only ${MAX_CLASSES_PER_DAY} classes allowed per day.`);
  }

  // Check for overlapping
  const isOverlapping = existingClasses.some((cls) => {
    const existingStart = cls.date;
    const existingEnd = new Date(
      existingStart.getTime() + (cls.duration || DEFAULT_DURATION) * 60000
    );
    return newStart < existingEnd && newEnd > existingStart;
  });

  if (isOverlapping) {
    throw new Error("Class time overlaps with an existing class.");
  }

  // Create class
  const result = await ClassScheduleModel.create({ ...inputData, duration });
  return result;
};

export const classScheduleServices = {
  createClassScheduleIntoDB,
};
