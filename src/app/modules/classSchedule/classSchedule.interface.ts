import { Types } from "mongoose";

export interface IClassSchedule {
  name: string;
  date: Date;
  duration: number;
  trainer: Types.ObjectId;
  trainees?: Types.ObjectId[];
}
