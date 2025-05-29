import { Types } from "mongoose";
import { ClassScheduleModel } from "../classSchedule/classSchedule.model";
import { UserModel } from "../user/user.model";
import { IBooking } from "./bookingClass.interface";
import { BookingModel } from "./bookingClass.model";

const MAX_TRAINEES = 10;
const DURATION = 120 * 60 * 1000;

// Create Booking
const createBookingIntoDB = async (data: IBooking) => {
  const { classId, traineeId } = data;

  // Check if trainee exists
  const traineeExists = await UserModel.findById(traineeId);
  if (!traineeExists) throw new Error("Trainee not found");

  // Check if class exists
  const classSchedule = await ClassScheduleModel.findById(classId);
  if (!classSchedule) throw new Error("Class not found");

  // Check if class is full
  if ((classSchedule.trainees?.length ?? 0) >= MAX_TRAINEES) {
    throw new Error("Class is already full");
  }

  // Check if already booked this class
  if (classSchedule.trainees?.includes(new Types.ObjectId(traineeId))) {
    throw new Error("Trainee already booked this class");
  }

  // Check for time overlap with other classes this trainee booked
  const classStart = new Date(classSchedule.date);
  const classEnd = new Date(classStart.getTime() + DURATION);

  const overlappingClass = await ClassScheduleModel.findOne({
    trainees: traineeId,
    date: {
      $lt: classEnd,
      $gt: new Date(classStart.getTime() - DURATION), // overlap window
    },
  });

  if (overlappingClass) {
    throw new Error("Trainee already booked another class in this time slot");
  }

  // Save booking
  const booking = await BookingModel.create({ classId, traineeId });

  // Add trainee to class
  await ClassScheduleModel.findByIdAndUpdate(classId, {
    $push: { trainees: traineeId },
  });

  return booking;
};

export const bookingServices = {
  createBookingIntoDB,
};
