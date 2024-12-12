import { create } from 'zustand'
import { Product, SortConfig, FilterConfig } from '../types'
import { quickSort, mergeSort, shellSort } from '../lib/utils'

interface InventoryState {
  products: Product[]
  sortConfig: SortConfig
  filterConfig: FilterConfig
  filteredProducts: Product[]
  setProducts: (products: Product[]) => void
  sortProducts: (config: SortConfig) => void
  filterProducts: (config: FilterConfig) => void
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: (id: string) => void
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  products: [],
  filteredProducts: [],
  sortConfig: { key: 'name', order: 'asc' },
  filterConfig: {},
  
  setProducts: (products) => {
    set({ products, filteredProducts: products })
  },
  
  sortProducts: (config) => {
    const { products } = get()
    let sortedProducts: Product[]
    
    switch (config.key) {
      case 'price':
        sortedProducts = quickSort(products, config.key, config.order)
        break
      case 'name':
        sortedProducts = mergeSort(products, config.key)
        break
      case 'quantity':
        sortedProducts = shellSort(products, config.key)
        break
      default:
        sortedProducts = [...products]
    }
    
    set({ 
      products: sortedProducts, 
      filteredProducts: sortedProducts,
      sortConfig: config 
    })
  },
  
  filterProducts: (config) => {
    const { products } = get()
    let filtered = [...products]

    if (config.category) {
      filtered = filtered.filter(p => 
        p.category.toLowerCase().includes(config.category!.toLowerCase())
      )
    }

    if (config.minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= config.minPrice!)
    }

    if (config.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= config.maxPrice!)
    }

    if (config.minQuantity !== undefined) {
      filtered = filtered.filter(p => p.quantity >= config.minQuantity!)
    }

    set({ 
      filteredProducts: filtered,
      filterConfig: config 
    })
  },
  
  addProduct: (product) => set((state) => ({ 
    products: [...state.products, product],
    filteredProducts: [...state.filteredProducts, product]
  })),
  
  updateProduct: (product) => set((state) => ({
    products: state.products.map((p) => p.id === product.id ? product : p),
    filteredProducts: state.filteredProducts.map((p) => p.id === product.id ? product : p)
  })),
  
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter((p) => p.id !== id),
    filteredProducts: state.filteredProducts.filter((p) => p.id !== id)
  })),
}))