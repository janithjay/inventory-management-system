import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useInventoryStore } from '../store/useInventoryStore'
import { productAPI } from '../services/api'
import { InventoryOverview } from '../components/analytics/InventoryOverview'
import { TopProducts } from '../components/analytics/TopProducts'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { ProductTable } from '../components/products/ProductTableWithoutAction'


function Dashboard() {

  const { products, setProducts } = useInventoryStore()

  // Use React Query for data fetching
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: productAPI.getAllProducts,
  })

  // Sync the data to the state
  React.useEffect(() => {
    if (data) {
      setProducts(data)
    }
  }, [data, setProducts])

  // Get recent products (last 5)
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  // Get low stock products (quantity < 10)
  const lowStockProducts = products.filter(product => product.quantity < 10)



  return (
    <div className="space-y-6 ">
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
            />
          </CardContent>
        </Card>


        <TopProducts products={products} />


      </div>
    </div>
  )
}

export default Dashboard
