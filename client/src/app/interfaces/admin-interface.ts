export interface Admin {
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: 'admin';
}
