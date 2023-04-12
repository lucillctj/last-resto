export interface RestaurantOwner {
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  restaurantId?: number;
  role: 'restaurant owner';
}
