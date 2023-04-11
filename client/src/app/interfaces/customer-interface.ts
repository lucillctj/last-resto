export interface Customer {
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  postCode: string;
  city: string;
  productId?: number;
  role: 'customer';
}
