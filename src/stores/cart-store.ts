import { create } from 'zustand';
import { ProductProps } from '../utils/data/products';
import * as cartInMemory from './helpers/cart-in-memory';

/**
 * Libs used for data persistance, even if the application is closed.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ProductCartProps = ProductProps & {
  quantity: number;
};

type StateProps = {
  products: ProductCartProps[];
  add: (product: ProductProps) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

export const useCartStore = create(
  persist<StateProps>(
    (set) => ({
      products: [],

      add: (product: ProductProps) => {
        // 'set' is a zustand method, to update the state.
        set((state) => ({
          products: cartInMemory.add(state.products, product),
        }));
      },

      remove: (productId: string) => {
        set((state) => ({
          products: cartInMemory.remove(state.products, productId),
        }));
      },

      clear: () => set(() => ({ products: [] })),
    }),
    {
      name: 'nlw-expert:cart', // used to identify data stored in our app.
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
