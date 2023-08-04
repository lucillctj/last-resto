export interface Restaurant {
  restaurant_id?: number;
  name: string;
  description: string;
  address: string;
  post_code: string;
  city: string;
  phone: string;
  website: string | null;
  is_available: any;
  restaurant_owner_id: number | undefined;

}
