import Link from 'next/link'
import React from 'react'

type ProductPaginationProps = {
    page: number
    totalPages: number
}

function ProductPagination({ page, totalPages }: ProductPaginationProps) {

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <nav className='flex justify-center py-10'>
            {page > 1 && (
                <Link
                    className='bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-8'
                    href={`/admin/products?page=${page - 1}`} >
                    &laquo;
                </Link>
            )}
            {pages.map((x) => (
                <Link
                    key={x}
                    className={`${page === x && 'font-bold'} bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-8`}
                    href={`/admin/products?page=${x}`} >
                    {x}
                </Link>
            ))}
            {page < totalPages && (
                <Link
                    className='bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-8'
                    href={`/admin/products?page=${page + 1}`} >
                    &raquo;
                </Link>
            )}

        </nav>
    )
}

export default ProductPagination