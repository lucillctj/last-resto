import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RestaurantOwner} from "../../interfaces/restaurantOwner-interface";

@Injectable(
  // {providedIn: 'root'}
)
export class RestaurantOwnerService {
  private apiUrl = 'http://localhost:3000/api/v1/restaurant-owner';

  constructor(private http: HttpClient) { }

  getRestaurantOwners(): Observable<RestaurantOwner[]> {
    return this.http.get<RestaurantOwner[]>(this.apiUrl);
  }

  getRestaurantOwnerById(userId: number): Observable<RestaurantOwner> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<RestaurantOwner>(url);
  }

  createRestaurantOwner(user: RestaurantOwner): Observable<RestaurantOwner> {
    return this.http.post<RestaurantOwner>(this.apiUrl, user);
  }

  updateRestaurantOwner(user: RestaurantOwner): Observable<RestaurantOwner> {
    const url = `${this.apiUrl}/${user.userId}`;
    return this.http.put<RestaurantOwner>(url, user);
  }

  deleteRestaurantOwner(userId: number): Observable<void> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<void>(url);
  }
}
