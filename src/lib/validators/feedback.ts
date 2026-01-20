import { z } from "zod";

export const feedbackSchema = z
  .object({
    name: z.string().optional(),
    username: z.string().optional(),
    message: z
      .string()
      .min(10, "Message must be at least 10 characters")
      .max(1000),
    rating: z
      .number()
      .min(1, "Please select a rating")
      .max(5),
    accessCode: z.string().min(1, "Access code is required"),
    isAnonymous: z.boolean(),
  })
  .refine(
    (data) =>
      data.isAnonymous ||
      (!!data.name?.trim() && !!data.username?.trim()),
    {
      message: "Name and username are required unless anonymous",
      path: ["name"],
    }
  );
