import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserId: number | undefined;
  currentRestaurantId: number | undefined;


  constructor() { }

  setCurrentUserId(userId: number | undefined) {
    this.currentUserId = userId;
  }
  getCurrentUserId() {
    return this.currentUserId;
  }

  setCurrentRestaurantId(restaurantId: number | undefined) {
    this.currentRestaurantId = restaurantId;
  }

  getCurrentRestaurantId() {
    return this.currentRestaurantId;
  }

  // isLoggedIn(): boolean {
  //   return !!this.currentUserId;
  // }
  //
  // logout() {
  //   this.currentUserId = null;
  // }
}
