import React from 'react'
import { useInventoryStore } from '../store/useInventoryStore'
import { InventoryOverview } from '../components/analytics/InventoryOverview'
import { CategoryDistribution } from '../components/analytics/CategoryDistribution'
import { InventoryTrends } from '../components/analytics/InventoryTrends'
import { TopProducts } from '../components/analytics/TopProducts'

function Analytics() {
  const { products } = useInventoryStore()

  return (
    <div className="space-y-6">
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