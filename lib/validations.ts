import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

export const ReviewSchema = z.object({
  movieId: z.uuid("Invalid movie reference"),
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(3, "Comment must be at least 3 characters long"),
});