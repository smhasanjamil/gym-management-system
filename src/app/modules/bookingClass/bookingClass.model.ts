import { Schema, model } from "mongoose";
import { IBooking } from "./bookingClass.interface";

const bookingSchema = new Schema<IBooking>(
  {
    classId: {
      type: Schema.Types.ObjectId,
      ref: "ClassSchedule",
      required: true,
    },
    traineeId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const BookingModel = model<IBooking>("Booking", bookingSchema);
