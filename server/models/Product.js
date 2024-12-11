import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  imageUrl: String,
}, {
  timestamps: true,
});

// Indexes for better query performance
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ quantity: 1 });

export const Product = mongoose.model('Product', productSchema);