import mongoose from "mongoose";
import { z } from "zod";
import { DateTime } from "luxon";

const bookingClassSchema = z.object({
  body: z.object({
    traineeId: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid MongoDB ObjectId for trainee",
      }),
    classId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid MongoDB ObjectId for class",
    }),
  }),
});

export const bookingClassValidations = {
  bookingClassSchema,
};
