export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  description?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User { 
  id: string;
  username: string;  
  role: 'admin' | 'staff';
}

export interface SortConfig {
  key: keyof Product;
  order: 'asc' | 'desc';
}

export interface FilterConfig {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minQuantity?: number;
}