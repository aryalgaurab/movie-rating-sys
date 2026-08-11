"use server";

import { prisma } from "@/lib/prisma";
import { setSessionUser, clearSessionUser } from "@/lib/auth";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { registerSchema } from "../validations";

type AuthResult =
  | { success: true }
  | { success: false; message: string };

export async function registerAction(formdata: FormData): Promise<AuthResult> {
  const rawData = {
    name: formdata.get("name") as string,
    email: formdata.get("email") as string,
    password: formdata.get("password") as string,
  };

  const result = registerSchema.safeParse(rawData);

  if (!result.success) {
    return { success: false, message: result.error.issues[0].message };
  }

  const { name, email, password } = result.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { success: false, message: "User already exists." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: true };
}

export async function loginAction(formData: FormData): Promise<AuthResult> {
  const email = (formData.get("email") as string) ?? "";
  const password = (formData.get("password") as string) ?? "";

  if (!email || !password) {
    return { success: false, message: "Email and password are required." };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.password) {
    return { success: false, message: "Invalid email or password." };
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return { success: false, message: "Invalid email or password." };
  }

  await setSessionUser(user.id);
  return { success: true };
}

export async function logoutAction() {
  await clearSessionUser();
  redirect("/login");
}