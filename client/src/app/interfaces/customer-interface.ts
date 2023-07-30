export interface Customer {
  user_id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  post_code: string;
  city: string;
  product_id?: number;
  role: 'customer';
}
