import { IClassSchedule } from "./classSchedule.interface";
import { ClassScheduleModel } from "./classSchedule.model";

// Create User
const createClassScheduleIntoDB  = async (input: IClassSchedule) => {
  console.log(input);
  const result = await ClassScheduleModel.create(input);
  return result;
};

export const classScheduleServices = {
  createClassScheduleIntoDB,
};
