"use client"


import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderWithProducts } from "@/src/types";
import useSWR from "swr";

export default function OrdersPage() {
  const url = "/admin/order/api";

  const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al cargar los datos");
    }
    return response.json();
  };

  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 4000,
    revalidateOnFocus: false,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar las órdenes: {error.message}</p>;

  return (
    <>
      <Heading>Administrar Órdenes</Heading>
      {data && data.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {data.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-center">No hay órdenes pendientes</p>
      )}
    </>
  );
}
