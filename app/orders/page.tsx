"use client"

import LastItemOrder from "@/components/order/LastItemOrder"
import Logo from "@/components/ui/Logo"
import { OrderWithProducts } from "@/src/types"
import useSWR from "swr"

function OrdersPage() {

    const url = '/orders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)

    const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        revalidateOnFocus: false,
        refreshInterval: 4000
    })

    if (isLoading) return "Cargando...."
    if (data)
        return (
            <>
                <h1 className="text-center mt-20 text-6xl font-black'">Ordenes Listas</h1>
                <Logo />
                {data.length ? (
                    <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10 ">{
                        data.map(order => (
                            <LastItemOrder key={order.id} order={order} />
                        ))
                    }</div>
                ) : <p className="text-center my-10 ">No hay ordenes listas</p>}
            </>
        )
}

export default OrdersPage