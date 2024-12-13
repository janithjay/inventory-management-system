import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useInventoryStore } from '../store/useInventoryStore'
import { productAPI } from '../services/api'
import { InventoryOverview } from '../components/analytics/InventoryOverview'
import { TopProducts } from '../components/analytics/TopProducts'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { ProductTable } from '../components/products/ProductTable'

function Dashboard() {
  const navigate = useNavigate()
  const { products, setProducts, deleteProduct } = useInventoryStore()
  
  // Use React Query for data fetching
  useQuery({
    queryKey: ['products'],
    queryFn: productAPI.getAllProducts,
    onSuccess: setProducts
  })
  
  // Get recent products (last 5)
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  // Get low stock products (quantity < 10)
  const lowStockProducts = products.filter(product => product.quantity < 10)

  const handleEdit = (product: any) => {
    navigate('/products', { state: { editProduct: product } })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <InventoryOverview products={products} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductTable
              products={recentProducts}
              onEdit={handleEdit}
              onDelete={deleteProduct}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductTable
              products={lowStockProducts}
              onEdit={handleEdit}
              onDelete={deleteProduct}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
          </CardHeader>
          <CardContent>
            <TopProducts products={products} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard