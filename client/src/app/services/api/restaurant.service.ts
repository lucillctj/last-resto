import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Restaurant} from "../../interfaces/restaurant-interface";

@Injectable(
  {providedIn: 'root'}
)
export class RestaurantService {
  private apiUrl = 'http://localhost:3000/api/v1/restaurant';

  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiUrl);
  }

  getRestaurantDashboard(restaurantId: number): Observable<Restaurant> {
    const url = `${this.apiUrl}/${restaurantId}`;
    return this.http.get<Restaurant>(url);
  }

  createRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.apiUrl, restaurant);
  }

  updateRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    const url = `${this.apiUrl}/${restaurant.restaurantId}`;
    return this.http.put<Restaurant>(url, restaurant);
  }

  deleteRestaurant(restaurantId: number): Observable<void> {
    const url = `${this.apiUrl}/${restaurantId}`;
    return this.http.delete<void>(url);
  }
}
