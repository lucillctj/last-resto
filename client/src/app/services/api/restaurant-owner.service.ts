import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestaurantOwner } from '../../interfaces/restaurantOwner-interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RestaurantOwnerService {
  headers: HttpHeaders;
  requestOptions;
  private apiUrl = `${environment.apiUrl}/restaurant-owners`;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
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

  createRestaurantOwner(user: RestaurantOwner): Observable<any> {
    const url = `${this.apiUrl}/signup`;
    return this.http.post<any>(url, user, this.requestOptions);
  }

  getRestaurantOwnerDashboard(userId: number): Observable<RestaurantOwner> {
    const url = `${this.apiUrl}/dashboard/${userId}`;
    return this.http.get<RestaurantOwner>(url, this.requestOptions);
  }

  updateRestaurantOwner(
    updatedUser: RestaurantOwner,
    currentUser: RestaurantOwner
  ): Observable<any> {
    const url = `${this.apiUrl}/update/${currentUser.user_id}`;
    return this.http.put<any>(url, updatedUser, this.requestOptions);
  }
}
