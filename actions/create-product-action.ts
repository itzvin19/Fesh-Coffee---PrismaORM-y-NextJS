"use server"
import { prisma } from "@/src/lib/prisma";
import { ProductSchema } from "@/src/schemas";

export async function createProduct(data: unknown) {
    const result = ProductSchema.safeParse(data)
    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }
    try {
        await prisma.product.create({
            data: result.data
        })
    } catch (error) {
        console.log(error)
    }
}