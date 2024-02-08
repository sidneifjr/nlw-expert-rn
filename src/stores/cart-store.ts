import { create } from 'zustand';
import { ProductProps } from '../utils/data/products';
import * as cartInMemory from './helpers/cart-in-memory';

export type ProductCartProps = ProductProps & {
  quantity: number;
};

type StateProps = {
  products: ProductCartProps[];
  add: (product: ProductProps) => void;
};

export const useCartStore = create<StateProps>((set) => ({
  products: [],
  add: (product: ProductProps) => {
    // 'set' is a zustand method, to update the state.
    set((state) => ({
      products: cartInMemory.add(state.products, product),
    }));
  },
}));
