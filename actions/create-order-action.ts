"use server"

import { prisma } from "@/src/lib/prisma"
import { orderSchema } from "@/src/schemas"

export async function createOrder(data: unknown) {
    const result = orderSchema.safeParse(data)
    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }
    try {
        await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.order.map(x => ({
                        productId: x.id,
                        quantity: x.quantity
                    }))
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}