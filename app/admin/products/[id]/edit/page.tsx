import EditProductForm from "@/components/product/EditProductForm"
import ProductForm from "@/components/product/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"

async function getProductById(productId: number) {
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })
    if (!product) {
        notFound()
    }
    return product
}

type tParams = Promise<{ id: string }>

export default async function EditProductPage({ params }: { params: tParams }) {

    const sp = await params
    const product = await getProductById(+sp.id);

    return (
        <>
            <GoBackButton />
            <Heading>Editar Producto: {product.name}</Heading>
            <EditProductForm>
                <ProductForm product={product} />
            </EditProductForm>
        </>
    );
}

