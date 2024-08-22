import { NextRequest, NextResponse } from "next/server";
import { fromZodError } from 'zod-validation-error'
import schema from '../schema';
import prisma from "@/prisma/client";
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });
    //Fetch from the database 
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    return NextResponse.json(user)
    // If not found, return 404
    // Else return data
}
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {

    const body = await request.json()

    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ error: fromZodError(validation.error).message }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });
    if (!user) {
        return NextResponse.json({ error: `User doesn't exist` }, { status: 400 })
    }

    const emailExist = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    });
    if (emailExist) {
        return NextResponse.json({ error: 'Email already exist' }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            name: body.name,
            email: body.email
        }
    });

    return NextResponse.json(updatedUser, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });

    if (!user) {
        return NextResponse.json({ error: `User doesn't exist` }, { status: 400 })
    }

    await prisma.user.delete({
        where: {
            id: user.id
        }
    });

    return NextResponse.json({});
}