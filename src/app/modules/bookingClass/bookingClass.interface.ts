import { Types } from "mongoose";

export interface IBooking {
  classId: Types.ObjectId;
  traineeId: Types.ObjectId;
}
