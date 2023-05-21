export interface Admin {
  user_id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  role: 'admin';
}
