import { useEffect } from 'react';
import { socketService } from '../lib/socket';
import { useInventoryStore } from '../store/useInventoryStore';
import { Product } from '../types';

export function useSocket() {
  const { addProduct, updateProduct, deleteProduct } = useInventoryStore();

  useEffect(() => {
    const unsubscribe = socketService.subscribeToProducts((data: Product | string) => {
      if (typeof data === 'string') {
        // Handle delete
        deleteProduct(data);
      } else {
        // Handle create/update
        if ('id' in data) {
          updateProduct(data);
        } else {
          addProduct(data);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [addProduct, updateProduct, deleteProduct]);

  return socketService;
}