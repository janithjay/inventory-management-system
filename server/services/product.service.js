import { Product } from '../models/Product.js';

export const ProductService = {
  // Create a new product
  createProduct: async (productData) => {
    try {
      const product = new Product(productData);
      return await product.save();
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  },

  // Get all products
  getAllProducts: async () => {
    try {
      return await Product.find().sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw new Error(`Error fetching product: ${error.message}`);
    }
  },

  // Update product
  updateProduct: async (id, updateData) => {
    try {
      const product = await Product.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: new Date() },
        { new: true }
      );
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      return await Product.find({ category });
    } catch (error) {
      throw new Error(`Error fetching products by category: ${error.message}`);
    }
  },

  // Get low stock products
  getLowStockProducts: async (threshold = 10) => {
    try {
      return await Product.find({ quantity: { $lt: threshold } });
    } catch (error) {
      throw new Error(`Error fetching low stock products: ${error.message}`);
    }
  }
};