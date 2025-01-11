"use client"

import { updateProduct } from "@/actions/update-product-action"
import { ProductSchema } from "@/src/schemas"
import { useParams, useRouter } from "next/navigation"
import { toast } from "react-toastify"


function EditProductForm({ children }: { children: React.ReactNode }) {

    const router = useRouter()
    const params = useParams()

    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image')
        }
        const result = ProductSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach(x => {
                toast.error(x.message)
            })
            return
        }

        const response = await updateProduct(data, +params.id!)
        if (response?.errors) {
            response.errors.forEach(x => {
                toast.error(x.message)
            })
            return
        }
        toast.success("Producto actualizado")
        router.push('/admin/products')
    }

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
            <form className="space-y-5" action={handleSubmit}>
                {children}
                <input type="submit" value="Guardar Cambios" className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer" />
            </form>
        </div>
    )
}

export default EditProductForm