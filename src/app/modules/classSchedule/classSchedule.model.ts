import { model, Schema } from "mongoose";
import { IClassSchedule } from "./classSchedule.interface";

const classScheduleSchema = new Schema<IClassSchedule>({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, default: 120 },
  trainer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  trainees: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const ClassScheduleModel = model<IClassSchedule>(
  "ClassSchedule",
  classScheduleSchema
);
