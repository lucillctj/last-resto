import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../../interfaces/restaurant-interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  headers: HttpHeaders;
  requestOptions;
  private apiUrl = `${environment.apiUrl}/restaurants`;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      'Accept-Language': 'fr-FR',
      'X-Requested-With': 'XMLHttpRequest',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Content-Security-Policy':
        "default-src https:; script-src https: 'nonce-random'",
      'X-Frame-Options': 'SAMEORIGIN',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
    });
    this.requestOptions = { withCredentials: true, headers: this.headers };
  }

  createRestaurant(restaurant: Restaurant): Observable<any> {
    const url = `${this.apiUrl}/create/${restaurant.user_id}`;
    return this.http.post<any>(url, restaurant, this.requestOptions);
  }

  getRestaurantByUserId(userId: number): Observable<Restaurant[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<Restaurant[]>(url, this.requestOptions);
  }

  getRestaurantDashboard(
    restaurantId: number,
    userId: number
  ): Observable<Restaurant> {
    const url = `${this.apiUrl}/dashboard/${restaurantId}/user/${userId}`;
    return this.http.get<Restaurant>(url, this.requestOptions);
  }

  getAllRestaurants(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  updateRestaurant(restaurant: Restaurant): Observable<any> {
    const url = `${this.apiUrl}/update/${restaurant.restaurant_id}/user/${restaurant.user_id}`;
    return this.http.put<any>(url, restaurant, this.requestOptions);
  }

  updateAvailability(
    restaurant: Restaurant,
    isAvailable: boolean
  ): Observable<any> {
    const url = `${this.apiUrl}/update-availability/${restaurant.restaurant_id}/user/${restaurant.user_id}`;
    return this.http.put<any>(url, { isAvailable }, this.requestOptions);
  }

  deleteRestaurant(restaurant: Restaurant): Observable<void> {
    const url = `${this.apiUrl}/delete/${restaurant.restaurant_id}/user/${restaurant.user_id}`;
    return this.http.delete<void>(url, this.requestOptions);
  }
}
