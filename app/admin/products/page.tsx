import ProductPagination from "@/components/product/ProductPagination"
import ProductSearchForm from "@/components/product/ProductSearchForm"
import ProductTable from "@/components/product/ProductTable"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import { redirect } from "next/navigation"

const productCountData = async () => {
  return await prisma.product.count()
}

const getProducts = async (pageSize: number, page: number) => {
  const skip = (page - 1) * pageSize
  const products = await prisma.product.findMany({
    include: {
      category: true
    },
    take: pageSize,
    skip
  })
  return products
}

export type ProductWithCategoryName = Awaited<ReturnType<typeof getProducts>>

export default async function ProductPage({ searchParams }: { searchParams: Promise<{ page: string }> }) {

  const pageSize = 10
  const sp = await searchParams
  const page = +sp.page || 1
  if (page < 0) redirect('/admin/products')
  const [products, productCount] = await Promise.all([getProducts(pageSize, page), productCountData()])
  const totalPages = Math.ceil(productCount / pageSize)
  if (page > totalPages) redirect(`/admin/products?page=${totalPages}`)

  return (
    <>
      <Heading>Lista de productos</Heading>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-5 ">
        <Link href={"/admin/products/new"} className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer">Crear Producto</Link>
        <ProductSearchForm />
      </div>
      <ProductTable products={products} />
      <ProductPagination page={page} totalPages={totalPages} />
    </>
  )
}