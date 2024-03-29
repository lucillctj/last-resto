import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user-interface';
import { Customer } from '../interfaces/customer-interface';
import { RestaurantOwner } from '../interfaces/restaurantOwner-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<
    User | Customer | RestaurantOwner
  >;
  public currentUser: Observable<User | Customer | RestaurantOwner>;

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<
      User | Customer | RestaurantOwner
    >(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public setCurrentUser(user: User | Customer | RestaurantOwner | null): void {
    this.currentUserSubject.next(user as User | Customer | RestaurantOwner);
  }

  public getCurrentUser(): Observable<
    User | Customer | RestaurantOwner | null
  > {
    return this.currentUserSubject.asObservable();
  }

  forgetUser() {
    localStorage.removeItem('currentUser');
  }
}
