"use server";

import { prisma } from "@/lib/prisma";
import { setSessionUser, clearSessionUser } from "@/lib/auth";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { registerSchema } from "../validations";

export async function registerAction (formdata : FormData) {
    const rawData = {
         name : formdata.get("name") as string,
         email : formdata.get("email") as string,
         password : formdata.get("password") as string,
    }

    const result = registerSchema.safeParse(rawData);

    if(!result.success) throw new Error(result.error.issues[0].message);
    

    const {name, email, password} = result.data;

    const existingUser = await prisma.user.findUnique({
        where: {email},
    })

    if(existingUser) throw new Error("User already exists.");
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword,
        }
    })

    redirect("/login")
}


export async function loginAction(formData :FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if(!email || !password) {
        throw new Error("Email and password are required.");
    }

    const user = await prisma.user.findUnique({
        where: {email},
    })

    if(!user || !user.password) {
        throw new Error ("Invalid Credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if(!isValidPassword) throw new Error("Invalid credentials")

    await setSessionUser(user.id);

    redirect("/");
}

export async function logoutAction() {
  await clearSessionUser();
  redirect("/login");
}