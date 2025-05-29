import mongoose from "mongoose";
import { z } from "zod";

const classScheduleSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Class name is required"),
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      })
      .transform((val) => new Date(val)),
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
      .max(10, "Maximum 10 trainees allowed per class schedule"),
  }),
});

export const classScheduleValidations = {
  classScheduleSchema,
};
