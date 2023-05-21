import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {User} from "../interfaces/user-interface";
import {Restaurant} from "../interfaces/restaurant-interface";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  // currentRestaurantId: number | undefined;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.getValue();
  }

  setCurrentUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser() {
    const userString = localStorage.getItem('currentUser');
    return userString ? JSON.parse(userString) : null;
  }


  setCurrentRestaurant(restaurant: Restaurant) {
    localStorage.setItem('currentRestaurant', JSON.stringify(restaurant));
  }

  getCurrentRestaurant(){
    const restaurantString = localStorage.getItem('currentRestaurant');
    return restaurantString ? JSON.parse(restaurantString) : null;  }


//To delete one item:

  //this.storage.delete('user').subscribe(() => {});
//To delete all items:

//this.storage.clear().subscribe(() => {});


  // isLoggedIn(): boolean {
  //   return !!this.currentUserId;
  // }
  //
  // logout() {
  //   this.currentUserId = null;
  // }
}
