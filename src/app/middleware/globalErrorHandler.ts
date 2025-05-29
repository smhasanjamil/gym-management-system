import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
// import { TErrorDetails } from "../interface/error";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handlerValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";
import { TErrorDetails } from "../interface/error";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorDetails: TErrorDetails = [
    {
      field: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorDetails;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorDetails;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorDetails;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorDetails;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorDetails = [
      {
        field: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorDetails = [
      {
        field: "",
        message: err?.message,
      },
    ];
  }

  //ultimate return
  res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
    err,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
