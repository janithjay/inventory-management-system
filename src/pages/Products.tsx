import React from 'react'
import { Plus } from 'lucide-react'
import { useInventoryStore } from '../store/useInventoryStore'
import { ProductTable } from '../components/products/ProductTable'
import { ProductForm } from '../components/products/ProductForm'
import { ProductFilters } from '../components/products/ProductFilters'
import { Button } from '../components/ui/button'
import { Product } from '../types'


function Products() {
  const { products, filterConfig, sortConfig, filterProducts, sortProducts, addProduct, updateProduct, deleteProduct } = useInventoryStore()
  const [showForm, setShowForm] = React.useState(false)
  const [selectedProduct, setSelectedProduct] = React.useState<Product | undefined>()
  

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setShowForm(true)     
  }

  const handleDelete = async (name: string) => {
    try {
      // Make DELETE request to the backend
      const response = await fetch(`http://localhost:5000/products/${name}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Product deleted successfully!');
        deleteProduct(name);
        
      } else {
        alert(result.error || 'Error! Could not delete the product.');
        
      }
    } catch (error) {
      alert('Error! Could not delete the product. Please try again.');
      
    }
  }; 

  const handleSubmit = (data: Partial<Product>) => {
    if (selectedProduct) {
      updateProduct({ ...selectedProduct, ...data } as Product)
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Product
      addProduct(newProduct)
    }
    setShowForm(false)
    setSelectedProduct(undefined)
  }

  const handleCancel  = () => {
    setShowForm(false)
    setSelectedProduct(undefined)
    
    
  }

  return (
    <div className="space-y-6 ml-64">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={() => setShowForm(true)} className="rounded-md  bg-black px-3 py-1.5 text-sm/6 font-semibold text-white border-2 border-black  shadow-sm hover:bg-black hover:text-white">
          <Plus className="h-4 w-4 mr-2 " />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1">
          <ProductFilters
            filters={filterConfig}
            onFilterChange={filterProducts}
          />
        </div>

        <div className="col-span-3">
          {showForm ? (
            <div className="bg-white p-6 rounded-lg shadow outline outline-2 -outline-offset-1 outline-gray-400">
              <h2 className="text-xl font-semibold mb-4">
                {selectedProduct ? 'Edit' : 'Add'} Product
              </h2>
              <ProductForm
                product={selectedProduct}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow outline outline-2 -outline-offset-1 outline-gray-400">
              <ProductTable
                products={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products