import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Admin} from "../interfaces/restaurantOwner-interface";

@Injectable(
  // {providedIn: 'root'}
)
export class RestaurantOwnerService {
  private apiUrl = 'http://localhost:3000/api/v1/restaurant-owner';

  constructor(private http: HttpClient) { }

  getRestaurantOwners(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.apiUrl);
  }

  getRestaurantOwnerById(userId: number): Observable<Admin> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<Admin>(url);
  }

  createRestaurantOwner(user: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.apiUrl, user);
  }

  updateRestaurantOwner(user: Admin): Observable<Admin> {
    const url = `${this.apiUrl}/${user.userId}`;
    return this.http.put<Admin>(url, user);
  }

  deleteRestaurantOwner(userId: number): Observable<void> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<void>(url);
  }
}
