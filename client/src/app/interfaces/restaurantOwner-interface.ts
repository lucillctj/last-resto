export interface RestaurantOwner {
  user_id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  restaurant_id?: number | undefined;
  role: 'restaurant owner';
}
