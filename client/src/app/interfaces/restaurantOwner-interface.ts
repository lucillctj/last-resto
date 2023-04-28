export interface RestaurantOwner {
  userId?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  restaurantId?: number;
  role: 'restaurant owner';
}