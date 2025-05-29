import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";

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

export const userControllers = {
  createUser,
};
