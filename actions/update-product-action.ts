"use server"
import { prisma } from "@/src/lib/prisma"
import { ProductSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

export const updateProduct = async (data: unknown, id: number) => {
    const result = ProductSchema.safeParse(data)
    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }
    try {
        await prisma.product.update({
            where: {
                id
            },
            data: result.data
        })
        revalidatePath('/admin/products')
    } catch (error) {
        console.log(error)
    }
}