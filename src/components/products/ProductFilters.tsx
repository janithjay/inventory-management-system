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
    <div className="bg-white p-4 rounded-lg shadow space-y-4 outline outline-2 -outline-offset-1 outline-gray-400">
      <h3 className="text-lg font-medium">Filters</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 py-1.5">Category</label>
        <input
          type="text"
          value={localFilters.category || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, category: e.target.value })}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 py-1.5">Min Price</label>
        <input
          type="number"
          value={localFilters.minPrice || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, minPrice: parseFloat(e.target.value) })}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 py-1.5">Max Price</label>
        <input
          type="number"
          value={localFilters.maxPrice || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, maxPrice: parseFloat(e.target.value) })}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 py-1.5">Min Quantity</label>
        <input
          type="number"
          value={localFilters.minQuantity || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, minQuantity: parseInt(e.target.value) })}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          min="0"
        />
      </div>

      <div className="flex space-x-2">
        <Button onClick={handleApplyFilters} className="flex-1 rounded-md bg-green-50 px-3 py-1.5 text-sm/6 font-semibold text-green-700 ring-4 ring-inset ring-green-500/20">
          Apply Filters
        </Button>
        <Button variant="outline" onClick={handleReset} className="flex-1 rounded-md bg-red-50 px-3 py-4 text-sm/5 font-semibold text-red-700 ring-4 ring-inset ring-red-600/20">
          Reset
        </Button>
      </div>
    </div>
  )
}