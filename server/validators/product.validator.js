import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(0, 'Price must be greater than or equal to 0'),
  quantity: z.number().int().min(0, 'Quantity must be greater than or equal to 0'),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

export const validateProduct = (req, res, next) => {
  try {
    productSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      message: 'Invalid product data',
      errors: error.errors,
    });
  }
};