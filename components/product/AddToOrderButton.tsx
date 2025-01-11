"use client"

import { UseStore } from "@/src/store"
import { Product } from "@prisma/client"

type addToOrderButtonProps={
    product:Product
}

export default function addToOrderButton({product}:addToOrderButtonProps) {

    const addToOrder=UseStore(x=>x.addToOrder)

    return (
        <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer" 
            onClick={()=>addToOrder(product)}>
            Agregar
        </button>
    )
}
