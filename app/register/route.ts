
import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "./schema";
import { fromZodError } from "zod-validation-error";
import prisma from "@/prisma/client";
import argon2 from 'argon2';
export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ error: fromZodError(validation.error).message }, { status: 400 })
    }
    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })

    if (user) {
        return NextResponse.json({ error: 'user already exist' }, { status: 400 });
    }

    const hashPass = await argon2.hash(body.password);

    const newUser = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: hashPass
        }
    })
    return NextResponse.json(newUser, { status: 201 });
}