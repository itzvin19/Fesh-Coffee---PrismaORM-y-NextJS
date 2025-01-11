import ProductSearchForm from "@/components/product/ProductSearchForm";
import ProductTable from "@/components/product/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerm: string) {
    return await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ search: string }> }) {

    const sp = await searchParams
    const products = await searchProducts(sp.search)

    return (
        <>

            <Heading>Resultados de búsqueda: <span className="font-bold">{sp.search}</span></Heading>
            <div className="flex flex-col lg:flex-row lg:justify-end gap-5 ">
                <ProductSearchForm />
            </div>
            {products.length ? (<ProductTable products={products} />) : <p className="text-center text-lg">No hay resultados</p>}

        </>
    )
}
