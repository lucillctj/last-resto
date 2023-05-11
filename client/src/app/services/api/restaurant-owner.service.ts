import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RestaurantOwner} from "../../interfaces/restaurantOwner-interface";

@Injectable(
  {providedIn: 'root'}
)
export class RestaurantOwnerService {
  private apiUrl = 'http://localhost:3000/api/v1/restaurant-owners';

  constructor(private http: HttpClient) { }

  createRestaurantOwner(user: RestaurantOwner): Observable<any> {
    const url = `${this.apiUrl}/signup`;
    return this.http.post<any>(url, user);
  }

  getAllRestaurantOwners(): Observable<RestaurantOwner[]> {
    return this.http.get<RestaurantOwner[]>(this.apiUrl);
  }

  getRestaurantOwnerDashboard(userId: number): Observable<any> {
    const url = `${this.apiUrl}/dashboard/${userId}`;
    return this.http.get<any>(url);
  }

  updateRestaurantOwner(user: RestaurantOwner): Observable<any> {
    const url = `${this.apiUrl}/update/${user.user_id}`;
    return this.http.put<any>(url, user);
  }

  // deleteRestaurantOwner(userId: number): Observable<void> {
  //   const url = `${this.apiUrl}/delete/${userId}`;
  //   return this.http.delete<void>(url);
  // }
}
