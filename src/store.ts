import { create } from "zustand"
import { OrderItem } from "./types"
import { Product } from "@prisma/client"

interface Store {
    order: OrderItem[],
    addToOrder: (product: Product) => void
    increaseQuantity: (id: number) => void
    decreaseQuantity: (id: number) => void
    removeItem: (id: number) => void
    clearOrder: () => void
}

export const UseStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => {
        let order: OrderItem[] = []
        const { image, categoryId, ...data } = product
        void image;
        void categoryId;
        const productExists = get().order.find((item) => item.id === product.id)

        if (productExists) {
            order = get().order.map((x) => x.id === data.id ? {
                ...x,
                quantity: x.quantity + 1,
                subtotal: x.price * (x.quantity + 1)
            } : x)
        } else {
            order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * data.price
            }]
        }

        set(() => ({ order }))
    },
    increaseQuantity: (id) => {
        set(state => ({
            order: state.order.map((x) => x.id === id ? {
                ...x,
                quantity: x.quantity + 1,
                subtotal: x.price * (x.quantity + 1)
            } : x)
        }))
    },
    decreaseQuantity: (id) => {
        set(state => ({
            order: state.order.map((x) => x.id === id ? {
                ...x,
                quantity: x.quantity - 1,
                subtotal: x.price * (x.quantity - 1)
            } : x)
        }))
    },
    removeItem: (id) => {
        set(state => ({
            order: state.order.filter((x) => x.id !== id)
        }))
    },
    clearOrder: () => {
        set(() => ({
            order: []
        }))
    }
}))