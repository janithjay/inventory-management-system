import { create } from 'zustand'
import { Product, SortConfig, FilterConfig } from '../types'
import { quickSort, mergeSort, shellSort } from '../lib/utils'

interface InventoryState {
  products: Product[]
  sortConfig: SortConfig
  filterConfig: FilterConfig
  setProducts: (products: Product[]) => void
  sortProducts: (config: SortConfig) => void
  filterProducts: (config: FilterConfig) => void
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: (id: string) => void
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  products: [],
  sortConfig: { key: 'name', order: 'asc' },
  filterConfig: {},
  
  setProducts: (products) => set({ products }),
  
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
    
    set({ products: sortedProducts, sortConfig: config })
  },
  
  filterProducts: (config) => set({ filterConfig: config }),
  
  addProduct: (product) => set((state) => ({ 
    products: [...state.products, product] 
  })),
  
  updateProduct: (product) => set((state) => ({
    products: state.products.map((p) => 
      p.id === product.id ? product : p
    )
  })),
  
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter((p) => p.id !== id)
  })),
}))