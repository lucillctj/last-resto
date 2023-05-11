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

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiUrl);
  }

  getRestaurantDashboard(restaurantId: number): Observable<any> {
    const url = `${this.apiUrl}/dashboard/${restaurantId}`;
    return this.http.get<any>(url);
  }

  updateRestaurant(restaurant: Restaurant): Observable<any> {
    const url = `${this.apiUrl}/update/${restaurant.restaurantId}`;
    return this.http.put<any>(url, restaurant);
  }

  deleteRestaurant(restaurantId: number): Observable<void> {
    const url = `${this.apiUrl}/delete/${restaurantId}`;
    return this.http.delete<void>(url);
  }
}
