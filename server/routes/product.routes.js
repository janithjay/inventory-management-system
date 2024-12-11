import express from 'express';
import { Product } from '../models/Product.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateProduct } from '../validators/product.validator.js';

const router = express.Router();

// Get all products
router.get('/', authenticateToken, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product
router.post('/', authenticateToken, validateProduct, async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    req.app.get('io').emit('product:created', savedProduct);
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product
router.put('/:id', authenticateToken, validateProduct, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    req.app.get('io').emit('product:updated', product);
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    req.app.get('io').emit('product:deleted', req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const productRouter = router;