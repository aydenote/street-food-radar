
import { useState, useEffect } from 'react';
import { storeManager } from '@/store/storeStore';
import { Store } from '@/types/user';

export const useStores = () => {
  const [stores, setStores] = useState<Store[]>(storeManager.getStores());

  useEffect(() => {
    const unsubscribe = storeManager.subscribe(() => {
      setStores(storeManager.getStores());
    });

    return unsubscribe;
  }, []);

  return {
    stores,
    addStore: (storeData: any, ownerId: string) => storeManager.addStore(storeData, ownerId),
    updateStoreStatus: (storeId: string, isOpen: boolean) => storeManager.updateStoreStatus(storeId, isOpen),
    getStoresByOwner: (ownerId: string) => storeManager.getStoresByOwner(ownerId)
  };
};
