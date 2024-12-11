import React from 'react'
import { FilterConfig } from '../../types'
import { Button } from '../ui/button'

interface ProductFiltersProps {
  filters: FilterConfig
  onFilterChange: (filters: FilterConfig) => void
}

export function ProductFilters({ filters, onFilterChange }: ProductFiltersProps) {
  const [localFilters, setLocalFilters] = React.useState(filters)

  const handleApplyFilters = () => {
    onFilterChange(localFilters)
  }

  const handleReset = () => {
    const resetFilters: FilterConfig = {}
    setLocalFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <h3 className="text-lg font-medium">Filters</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          value={localFilters.category || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, category: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Min Price</label>
        <input
          type="number"
          value={localFilters.minPrice || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, minPrice: parseFloat(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Max Price</label>
        <input
          type="number"
          value={localFilters.maxPrice || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, maxPrice: parseFloat(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Min Quantity</label>
        <input
          type="number"
          value={localFilters.minQuantity || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, minQuantity: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          min="0"
        />
      </div>

      <div className="flex space-x-2">
        <Button onClick={handleApplyFilters} className="flex-1">
          Apply Filters
        </Button>
        <Button variant="outline" onClick={handleReset} className="flex-1">
          Reset
        </Button>
      </div>
    </div>
  )
}