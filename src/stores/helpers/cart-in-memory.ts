import { ProductProps } from '@/src/utils/data/products';
import { ProductCartProps } from '../cart-store';

export function add(products: ProductCartProps[], newProduct: ProductProps) {
  const existingProduct = products.find(({ id }) => newProduct.id === id);

  if (existingProduct) {
    return products.map((product) =>
      product.id === existingProduct.id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
  }

  // Returns all products, plus the new product with a quantity property.
  return [...products, { ...newProduct, quantity: 1 }];
}
