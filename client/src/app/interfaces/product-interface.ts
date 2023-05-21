export interface Product {
  product_id?: number;
  name: string;
  description: string;
  price: number;
  user_id?: number;
  restaurant_id: number | undefined;
}
