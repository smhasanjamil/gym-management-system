import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(2, "Please enter a valid name"),

    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format"),

    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password must be at least 6 characters long"),

    role: z.enum(["admin", "trainer", "trainee"]).optional().default("trainee"),
  }),
});

export const userValidations = {
  createUserValidationSchema,
};
