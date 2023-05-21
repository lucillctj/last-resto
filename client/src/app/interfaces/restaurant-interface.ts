export interface Restaurant {
  restaurant_id?: number;
  name: string;
  description: string;
  address: string;
  post_code: string;
  city: string;
  phone: string;
  website: string;
  is_reserved: boolean;
  user_id: number | undefined;

}
