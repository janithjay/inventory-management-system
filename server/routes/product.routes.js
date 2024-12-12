import express from 'express';
import { ProductService } from '../services/product.service.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateProduct } from '../validators/product.validator.js';

const router = express.Router();

// Get all products
router.get('/', authenticateToken, async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product
router.post('/', authenticateToken, validateProduct, async (req, res) => {
  try {
    const product = await ProductService.createProduct(req.body);
    req.app.get('io').emit('product:created', product);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product
router.put('/:id', authenticateToken, validateProduct, async (req, res) => {
  try {
    const product = await ProductService.updateProduct(req.params.id, req.body);
    req.app.get('io').emit('product:updated', product);
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await ProductService.deleteProduct(req.params.id);
    req.app.get('io').emit('product:deleted', req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get products by category
router.get('/category/:category', authenticateToken, async (req, res) => {
  try {
    const products = await ProductService.getProductsByCategory(req.params.category);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get low stock products
router.get('/low-stock', authenticateToken, async (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold) || 10;
    const products = await ProductService.getLowStockProducts(threshold);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const productRouter = router;