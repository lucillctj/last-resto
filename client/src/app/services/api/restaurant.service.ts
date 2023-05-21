import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Restaurant} from "../../interfaces/restaurant-interface";

@Injectable(
  {providedIn: 'root'}
)
export class RestaurantService {
  private apiUrl = 'http://localhost:3000/api/v1/restaurants';

  constructor(private http: HttpClient) { }

  createRestaurant(restaurant: Restaurant): Observable<any> {
    const url = `${this.apiUrl}/create`;
    return this.http.post<any>(url, restaurant);
  }

  getRestaurantByUserId(userId: number): Observable<Restaurant[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<Restaurant[]>(url);
  }

  getRestaurantDashboard(restaurantId: number): Observable<Restaurant[]> {
    const url = `${this.apiUrl}/dashboard/${restaurantId}`;
    return this.http.get<Restaurant[]>(url);
  }

  getAllRestaurants(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get<any>(url);
  }

  updateRestaurant(restaurant: Restaurant): Observable<any> {
    const url = `${this.apiUrl}/update/${restaurant.restaurant_id}`;
    return this.http.put<any>(url, restaurant);
  }

  deleteRestaurant(restaurant: Restaurant): Observable<void> {
    const url = `${this.apiUrl}/delete/${restaurant.restaurant_id}`;
    return this.http.delete<void>(url);
  }
}
