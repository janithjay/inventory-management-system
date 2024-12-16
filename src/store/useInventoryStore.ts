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
  deleteProduct: (name: string) => void
}

export const useInventoryStore = create<InventoryState>((set, get) => {
  // Load products from localStorage on app start
  const storedProducts = localStorage.getItem('products');
  const initialProducts = storedProducts ? JSON.parse(storedProducts) : [];

  return {
    products: initialProducts,
    filteredProducts: initialProducts,
    sortConfig: { key: 'name', order: 'asc' },
    filterConfig: {},
    
    setProducts: (products) => {
      localStorage.setItem('products', JSON.stringify(products)); // Persist to localStorage
      set({ products, filteredProducts: products });
    },
    
    sortProducts: (config) => {
      const { products } = get();
      let sortedProducts: Product[];

      switch (config.key) {
        case 'price':
          sortedProducts = quickSort(products, config.key, config.order);
          break;
        case 'name':
          sortedProducts = mergeSort(products, config.key);
          break;
        case 'quantity':
          sortedProducts = shellSort(products, config.key);
          break;
        default:
          sortedProducts = [...products];
      }

      set({ 
        products: sortedProducts, 
        filteredProducts: sortedProducts,
        sortConfig: config 
      });
    },
    
    filterProducts: (config) => {
      const { products } = get();
      let filtered = [...products];

      if (config.category) {
        filtered = filtered.filter(p => 
          p.category.toLowerCase().includes(config.category!.toLowerCase())
        );
      }

      if (config.minPrice !== undefined) {
        filtered = filtered.filter(p => p.price >= config.minPrice!);
      }

      if (config.maxPrice !== undefined) {
        filtered = filtered.filter(p => p.price <= config.maxPrice!);
      }

      if (config.minQuantity !== undefined) {
        filtered = filtered.filter(p => p.quantity >= config.minQuantity!);
      }

      set({ 
        filteredProducts: filtered,
        filterConfig: config 
      });
    },
    
    addProduct: (product) => set((state) => {
      const newProducts = [...state.products, product];
      localStorage.setItem('products', JSON.stringify(newProducts)); // Persist to localStorage
      return { 
        products: newProducts,
        filteredProducts: newProducts
      };
    }),
    
    updateProduct: (product) => set((state) => {
      const updatedProducts = state.products.map((p) =>
        p.name === product.name ? product : p
      );
      localStorage.setItem('products', JSON.stringify(updatedProducts)); // Persist to localStorage
      return {
        products: updatedProducts,
        filteredProducts: updatedProducts
      };
    }),
    
    deleteProduct: (name) => set((state) => {
      const remainingProducts = state.products.filter((p) => p.name !== name);
      localStorage.setItem('products', JSON.stringify(remainingProducts)); // Persist to localStorage
      return {
        products: remainingProducts,
        filteredProducts: remainingProducts
      };
    }),
  };
});
