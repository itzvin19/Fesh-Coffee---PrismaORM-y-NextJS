import ProductCard from '@/components/product/ProductCard'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import React from 'react'

async function getProducts(category: string) {
  return await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
}

export default async function OrderPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const products = await getProducts(category)
  return (
    <>
      <Heading>
        Elige y personaliza tu pedido a continuación
      </Heading>
      <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 items-start">
        {products.map(x => (
          <ProductCard key={x.id} product={x} />
        ))}
      </div>
    </>
  )
}
