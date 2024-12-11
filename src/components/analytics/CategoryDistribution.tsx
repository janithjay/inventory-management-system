import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Product } from '../../types'

interface CategoryDistributionProps {
  products: Product[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export function CategoryDistribution({ products }: CategoryDistributionProps) {
  const categoryData = React.useMemo(() => {
    const categories = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + product.quantity
      return acc
    }, {} as Record<string, number>)

    return Object.entries(categories).map(([name, value]) => ({
      name,
      value,
    }))
  }, [products])

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Category Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => 
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}