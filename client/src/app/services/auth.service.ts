import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUserId: number | undefined;

  constructor() { }

  setCurrentUserId(userId: number | undefined) {
    this.currentUserId = userId;
  }
  getCurrentUserId() {
    return this.currentUserId;
  }

  // isLoggedIn(): boolean {
  //   return !!this.currentUserId;
  // }
  //
  // logout() {
  //   this.currentUserId = null;
  // }
}
