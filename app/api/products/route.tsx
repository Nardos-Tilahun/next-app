import { NextRequest, NextResponse } from "next/server";
import schema from './schema';
import { fromZodError } from "zod-validation-error";
import prisma from "@/prisma/client";
export async function GET(request: NextRequest) {
    const products = await prisma.product.findMany();
    if (!products) {
        return NextResponse.json({ error: 'No products found' }, { status: 400 });
    }
    return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    //validate
    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ error: fromZodError(validation.error).message }, { status: 400 })
    }
    const product = await prisma.product.create({
        data: {
            name: body.name,
            price: body.price,
            description: body.description,
        }
    })
    return NextResponse.json(product, { status: 201 });
}


