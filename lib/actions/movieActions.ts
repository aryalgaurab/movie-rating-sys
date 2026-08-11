"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "../auth";

export async function createMovie(formData: FormData) {

  const user = await getSessionUser();

  if(!user || !(user.role = "ADMIN")) {
    throw new Error("Unauthorized: You are not allowed");
  }
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;

  if (!title || !description || !imageUrl) {
    throw new Error("All fields are required.");
  }

  await prisma.movie.create({
    data: {
      title,
      description,
      imageUrl,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

