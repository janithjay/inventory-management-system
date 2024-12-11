import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Product } from '../../types'

interface InventoryTrendsProps {
  products: Product[]
}

export function InventoryTrends({ products }: InventoryTrendsProps) {
  const trendData = React.useMemo(() => {
    const sortedProducts = [...products].sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )

    return sortedProducts.map(product => ({
      date: new Date(product.createdAt).toLocaleDateString(),
      quantity: product.quantity,
      value: product.price * product.quantity,
    }))
  }, [products])

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Inventory Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="quantity"
                stroke="#8884d8"
                name="Quantity"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="value"
                stroke="#82ca9d"
                name="Value ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}