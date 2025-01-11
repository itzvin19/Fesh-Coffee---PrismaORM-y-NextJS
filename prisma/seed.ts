import { PrismaClient } from "@prisma/client";
import { categories } from "./data/category";
import { products } from "./data/product";

const prisma = new PrismaClient()

async function main() {
    try {
        await prisma.category.createMany({
            data: categories
        })
        await prisma.product.createMany({
            data: products
        })

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
})