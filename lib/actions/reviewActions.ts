"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "../auth";
import { ReviewSchema } from "../validations";

export async function submitReview(formData: FormData) {
  const user = await getSessionUser();

  if(!user) {
    throw new Error("Login to leave a review");
  }
   const rawData = {
        movieId : formData.get("movieId") as string,
        ratingStr : formData.get("rating") as string,
        comment : formData.get("comment") as string,
    }

    const result = ReviewSchema.safeParse(rawData)

    if(!result.success) throw new Error(result.error.issues[0].message);
    

    const {movieId, rating ,comment } = result.data;

  await prisma.review.upsert({
    where: {
      userId_movieId: {
        userId : user.id,
        movieId,
      },
    },
    update: {
      rating,
      comment,
    },
    create: {
      rating,
      comment,
      userId: user.id,
      movieId,
    },
  });

  revalidatePath("/");
  revalidatePath(`/movies/${movieId}`);
}