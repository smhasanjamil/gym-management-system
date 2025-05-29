import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";

// Create User
const createUser = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await userServices.createUserIntoDB(user);

  //   send response
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

// Create Trainer
const createTrainer = catchAsync(async (req, res) => {
  const user = { ...req.body, role: "trainer" };
  const result = await userServices.createUserIntoDB(user);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Trainer created successfully",
    data: result,
  });
});

// Update Trainee
const updateTrainee = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const result = await userServices.updateTraineeById(id, updateData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Trainee updated successfully",
    data: result,
  });
});

// Update Trainer
const updateTrainer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const result = await userServices.updateTrainerById(id, updateData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Trainer updated successfully",
    data: result,
  });
});

// Delete Trainee
const deleteTrainee = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await userServices.deleteTraineeById(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Trainee deleted successfully",
    data: result,
  });
});

// Delete Trainer
const deleteTrainer = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await userServices.deleteTrainerById(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Trainer deleted successfully",
    data: result,
  });
});

export const userControllers = {
  createUser,
  createTrainer,
  updateTrainee,
  updateTrainer,
  deleteTrainee,
  deleteTrainer,
};
