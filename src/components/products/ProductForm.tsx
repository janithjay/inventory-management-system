import React from 'react';
import { Product } from '../../types';
import { Button } from '../ui/button';

interface ProductFormProps {
  product?: Product;
  onCancel: () => void;
  onSubmit: (data: Partial<Product>) => void;
}

export function ProductForm({ product, onCancel }: ProductFormProps) {
  const [formData, setFormData] = React.useState({
    name: product?.name || '',
    category: product?.category || '',
    price: product?.price || 0,
    quantity: product?.quantity || 0,
    description: product?.description || '',    
  });

  const [labelText, setLabelText] = React.useState('');
  const [labelStyle, setLabelStyle] = React.useState(
    'hidden text-sm font-medium text-green-700'
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const endpoint = product
        ? `http://localhost:5000/products/${product.name}` // Use the product name in the PUT request
        : 'http://localhost:5000/products'; // POST for new products

      console.log('Sending PUT request to:', endpoint);  

      const response = await fetch(endpoint, {
        method: product ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setLabelText(
          product
            ? 'Product updated successfully!'
            : 'Product created successfully!'
        );
        
        setLabelStyle('text-sm font-medium text-green-700');
      } else {
        if (result.error === 'Product already exists') {
          setLabelText('Product already exists. try updating the product instead.');
          setLabelStyle('text-sm font-medium text-red-700');
        }

      }
    } catch (error) {
      setLabelText('Error! Could not submit the product. Please try again.');
      setLabelStyle('text-sm font-medium text-red-700');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          min="0"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          rows={3}
        />
      </div>


      <div>
        <label className={labelStyle}>{labelText}</label>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {product ? 'Update' : 'Create'} Product
        </Button>
      </div>
    </form>
  )
}