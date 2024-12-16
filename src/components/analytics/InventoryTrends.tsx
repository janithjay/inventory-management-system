import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Product } from '../../types'

interface InventoryTrendsProps {
  products: Product[]
}

export function InventoryTrends({ products }: InventoryTrendsProps) {
  const trendData = React.useMemo(() => {
    const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name))

    return sortedProducts.map((product) => ({
      name: product.name, // Use product name for X-axis
      quantity: product.quantity, // Use quantity as the metric for the chart
    }))
  }, [products])

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Inventory Quantity </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                label={{ value: 'Products', position: 'insideBottom', offset: -5 }}
                interval={0} // Ensures all product names are displayed
                tick={{ fontSize: 12 }} // Adjust font size for readability
              />
              <YAxis
                label={{ value: 'Quantity', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                formatter={(value, name) =>
                  name === 'Quantity' ? `Quantity: ${value}` : value
                }
              />
              
              <Line
                type="monotone"
                dataKey="quantity"
                stroke="#8884d8"
                name="Quantity"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
