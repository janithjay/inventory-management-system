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
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <div>
        <label className="block text-sm font-medium text-gray-700 py-1.5">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="block w-full rounded-md bg-white px-3 py-1 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 py-1.5">Category</label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="block w-full rounded-md bg-white px-3 py-1 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 py-1.5">Price</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
          className="block w-full rounded-md bg-white px-3 py-1 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 py-1.5">Quantity</label>
        <input
          type="number"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
          className="block w-full rounded-md bg-white px-3 py-1 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          min="0"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 py-1.5">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="block w-full rounded-md bg-white px-3 py-1 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          rows={3}
        />
      </div>


      <div>
        <label className={labelStyle}>{labelText}</label>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel} className=" rounded-md bg-red-50 px-3 py-4 text-sm/5 font-semibold text-red-700 ring-4 ring-inset ring-red-600/20">
          Cancel
        </Button>
        <Button type="submit" className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500">
          
          {product ? 'Update' : 'Create'} Product
        </Button>
      </div>
    </form>
  )
}