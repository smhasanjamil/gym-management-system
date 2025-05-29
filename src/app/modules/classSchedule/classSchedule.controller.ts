import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { classScheduleServices } from "./classSchedule.service";
import catchAsync from "../../utils/catchAsync";

// Create User
const createClassSchedule = catchAsync(async (req, res) => {
  const classData = req.body;
  const result = await classScheduleServices.createClassScheduleIntoDB(
    classData
  );

  //   send response
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Class Schedule created successfully",
    data: result,
  });
});

// Get all classes for specific trainer

const getClassesByTrainer = catchAsync(async (req, res) => {
  const { trainerId } = req.params;

  const result = await classScheduleServices.getClassesByTrainerId(trainerId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Classes fetched successfully by trainer ID",
    data: result,
  });
});

export const classScheduleControllers = {
  createClassSchedule,
  getClassesByTrainer,
};
