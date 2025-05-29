import mongoose from "mongoose";
import { z } from "zod";
import { DateTime } from "luxon";

const classScheduleSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Class name is required"),

    date: z
      .string()
      .refine(
        (val) => {
          const dt = DateTime.fromFormat(val, "yyyy-MM-dd hh:mm a", {
            zone: "Asia/Dhaka",
          });
          return dt.isValid;
        },
        { message: "Invalid date format. Use 'YYYY-MM-DD hh:mm AM/PM'" }
      )
      .transform((val) =>
        DateTime.fromFormat(val, "yyyy-MM-dd hh:mm a", { zone: "Asia/Dhaka" })
          .toUTC()
          .toJSDate()
      ),

    duration: z
      .number()
      .int()
      .min(120, "Duration must be at least 120 minutes")
      .optional()
      .default(120),
    trainer: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid MongoDB ObjectId for trainer",
    }),
    trainees: z
      .array(
        z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
          message: "Invalid MongoDB ObjectId in trainees array",
        })
      )
      .max(10, "Maximum 10 trainees allowed per class schedule")
      .optional(),
  }),
});

export const classScheduleValidations = {
  classScheduleSchema,
};
