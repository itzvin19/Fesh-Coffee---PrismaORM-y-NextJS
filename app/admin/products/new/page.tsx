import AddProductForm from "@/components/product/AddProductForm"
import ProductForm from "@/components/product/ProductForm"
import Heading from "@/components/ui/Heading"

function NewProduct() {
  return (
    <>
      <Heading>Nuevo producto</Heading>
      <AddProductForm >
        <ProductForm />
      </AddProductForm>
    </>
  )
}

export default NewProduct