import React from 'react'
import { FilterConfig, SortConfig } from '../../types'
import { Button } from '../ui/button'

interface ProductFiltersProps {
  filters: FilterConfig
  sort: SortConfig
  onFilterChange: (filters: FilterConfig) => void
  onSortChange: (sort: SortConfig) => void
}

export function ProductFilters({ filters, sort, onFilterChange, onSortChange }: ProductFiltersProps) {
  const [localFilters, setLocalFilters] = React.useState(filters)
  const [localSort, setLocalSort] = React.useState(sort)

  const handleApplyFilters = () => {
    onFilterChange(localFilters)
    onSortChange(localSort)
  }

  const handleReset = () => {
    const resetFilters: FilterConfig = {}
    const resetSort: SortConfig = { key: 'name', order: 'asc' }
    setLocalFilters(resetFilters)
    setLocalSort(resetSort)
    onFilterChange(resetFilters)
    onSortChange(resetSort)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <h3 className="text-lg font-medium">Filters and Sorting</h3>
      
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

      <div>
        <label className="block text-sm font-medium text-gray-700">Sort By</label>
        <select
          value={localSort.key}
          onChange={(e) => setLocalSort({ ...localSort, key: e.target.value as 'name' | 'price' | 'quantity' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="quantity">Quantity</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Sort Order</label>
        <select
          value={localSort.order}
          onChange={(e) => setLocalSort({ ...localSort, order: e.target.value as 'asc' | 'desc' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="flex space-x-2">
        <Button onClick={handleApplyFilters} className="flex-1">
          Apply
        </Button>
        <Button variant="outline" onClick={handleReset} className="flex-1">
          Reset
        </Button>
      </div>
    </div>
  )
}

