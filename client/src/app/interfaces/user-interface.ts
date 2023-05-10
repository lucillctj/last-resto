export interface User {
  userId?: number;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  password: string;
  address?: string;
  post_code?: string;
  city?: string;
  productId?: number;
  role?: 'customer' | 'restaurant owner' | 'admin';
}
