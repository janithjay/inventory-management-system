import axios from 'axios';
import { Product } from '../types';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const productAPI = {
  // Get all products
  getAllProducts: async () => {
    const response = await api.get<Product[]>('/products');
    return response.data;
  },

  // Create a new product
  createProduct: async (product: Partial<Product>) => {
    const response = await api.post<Product>('/products', product);
    return response.data;
  },

  // Update a product
  updateProduct: async (id: string, product: Partial<Product>) => {
    const response = await api.put<Product>(`/products/${id}`, product);
    return response.data;
  },

  // Delete a product
  deleteProduct: async (id: string) => {
    await api.delete(`/products/${id}`);
  },

  // Get products by category
  getProductsByCategory: async (category: string) => {
    const response = await api.get<Product[]>(`/products/category/${category}`);
    return response.data;
  },

  // Get low stock products
  getLowStockProducts: async (threshold: number = 10) => {
    const response = await api.get<Product[]>(`/products/low-stock?threshold=${threshold}`);
    return response.data;
  },
};