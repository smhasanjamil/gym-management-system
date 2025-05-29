import status from "http-status";
import bcrypt from "bcrypt";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { TAuth } from "./auth.interface";

import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

const loginUser = async (payload: TAuth) => {
  const user = await UserModel.findOne({ email: payload?.email });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "This user is not found!");
  }


  if (!(await bcrypt.compare(payload?.password, user?.password))) {
    throw new AppError(status.UNAUTHORIZED, "Invalid password!");
  }

  // const jwtPayload: IJwtPayload = {
  //   id: user?._id?.toString(),
  //   name: user?.name as string,
  //   email: user?.email as string,
  //   phoneNumber: user?.phoneNumber as string,
  //   role: user?.role,
  //   isActive: user?.isActive,
  // };

  const jwtPayload = {
    id: user?._id?.toString(),
    name: user?.name,
    email: user?.email,
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: "10d",
    }
  );

  return { accessToken, refreshToken };
};

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { email } = decoded;

  const user = await UserModel.findOne({ email, isActive: true });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "This user is not found!");
  }

  const jwtPayload = {
    id: user?._id?.toString(),
    name: user?.name,
    email: user?.email,
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "1d",
  });

  return {
    accessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
