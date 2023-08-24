import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RestaurantOwner} from "../../interfaces/restaurantOwner-interface";

@Injectable(
  {providedIn: 'root'}
)
export class RestaurantOwnerService {
  private apiUrl = '/restaurant-owners';

  constructor(private http: HttpClient) { }

  createRestaurantOwner(user: RestaurantOwner): Observable<any> {
    const url = `${this.apiUrl}/signup`;
    return this.http.post<any>(url, user, {withCredentials: true});
  }

  getRestaurantOwnerDashboard(userId: number): Observable<RestaurantOwner> {
    const url = `${this.apiUrl}/dashboard/${userId}`;
    return this.http.get<RestaurantOwner>(url, {withCredentials: true});
  }

  updateRestaurantOwner(updatedUser: RestaurantOwner, currentUser: RestaurantOwner): Observable<any> {
    const url = `${this.apiUrl}/update/${currentUser.user_id}`;
    return this.http.put<any>(url, updatedUser, {withCredentials: true});
  }
}
