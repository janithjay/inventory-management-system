import { useQuery } from '@tanstack/react-query'
import { productAPI } from '../services/api'
import { InventoryOverview } from '../components/analytics/InventoryOverview'
import { CategoryDistribution } from '../components/analytics/CategoryDistribution'
import { InventoryTrends } from '../components/analytics/InventoryTrends'
import { TopProducts } from '../components/analytics/TopProducts'

function Analytics() {
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: productAPI.getAllProducts,
  })

  return (
    <div className="space-y-6 ml-64">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      
      <InventoryOverview products={products} />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CategoryDistribution products={products} />
        <InventoryTrends products={products} />
        <TopProducts products={products} />
      </div>
    </div>
  )
}

export default Analytics