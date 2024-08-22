import { NextRequest, NextResponse } from "next/server";
import { fromZodError } from 'zod-validation-error'
import schema from '../schema';
import prisma from '@/prisma/client';
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    const product = await prisma.product.findUnique({
        where: {
            id: params.id
        }
    })
    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json(product)
}
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {

    const body = await request.json()

    const product = await prisma.product.findUnique({
        where: {
            id: params.id
        }
    })
    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const validation = schema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json({ error: fromZodError(validation.error).message }, { status: 400 })
    }

    const newProduct = await prisma.product.update({
        where: {
            id: params.id
        },
        data: {
            name: body.name,
            price: body.price,
            description: body.description
        }
    })

    return NextResponse.json(newProduct, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {

    const product = await prisma.product.findUnique({
        where: {
            id: params.id
        }
    })
    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    await prisma.product.delete({
        where: {
            id: params.id
        }
    })
    return NextResponse.json({});
}