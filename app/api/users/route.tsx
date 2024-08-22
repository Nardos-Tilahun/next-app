import { NextRequest, NextResponse } from "next/server";
import schema from './schema';
import { fromZodError } from "zod-validation-error";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
    const users = await prisma.user.findMany();
    // fetch user from the database
    return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    //validate
    const validation = schema.safeParse(body);
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

    const newUser = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email
        }
    })

    return NextResponse.json(newUser, { status: 201 });
}

