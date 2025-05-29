import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../config";
import { Request, Response } from "express";

const loginUser = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await AuthService.loginUser(user);

  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  //   send response
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User is logged in successfully",
    data: {
      accessToken,
    },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  //   send response
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Access token is retrieved successfully",
    data: result,
  });
});

export const authControllers = {
  loginUser,
  refreshToken,
};
