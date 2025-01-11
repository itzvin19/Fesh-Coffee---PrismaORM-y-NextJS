"use client"

import { UseStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { orderSchema } from "@/src/schemas"
import { toast } from "react-toastify"

export function OrderSummary() {

  const { order, clearOrder } = UseStore()
  const total = useMemo(() => order.reduce((total, item) => total + (item.price * item.quantity), 0), [order])

  const handleOrderForm = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total,
      order
    }
    const result = orderSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach(x => {
        toast.error(x.message)
      })
      return
    }
    const response = await createOrder(data)
    if (response?.errors) {
      response.errors.forEach(x => {
        toast.error(x.message)
      })
      return
    }
    toast.success("Orden creada correctamente")
    clearOrder()
  }

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido:</h1>
      {order.length === 0 ? <p className="text-center my-10">El pedido está vacío</p> : (
        <div className="mt-5">
          {order.map((x) =>
            <ProductDetails key={x.id} item={x} />
          )}

          <p className="text-2xl mt-20 text-center">
            Total a pagar {''}
            <span className="font-bold">
              {formatCurrency(total)}
            </span>
          </p>
          <form action={handleOrderForm} className="w-full mt-10 space-y-5">
            <input type="text" placeholder="Tu nombre" className="bg-white border border-gray-100 p-2 w-full" name="name" />
            <input type="submit" className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold " value="Confirmar pedido" />
          </form>
        </div>
      )}

    </aside>
  )
}
