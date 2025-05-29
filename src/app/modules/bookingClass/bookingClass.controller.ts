import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingServices } from "./bookingClass.service";

// Create booking
const createBooking = catchAsync(async (req, res) => {
  const { classId, traineeId } = req.body;

  const result = await bookingServices.createBookingIntoDB({ classId, traineeId });

  //   send response
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

export const bookingControllers = {
  createBooking,
};
