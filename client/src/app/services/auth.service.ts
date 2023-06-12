import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {User} from "../interfaces/user-interface";
import {Restaurant} from "../interfaces/restaurant-interface";
import {Customer} from "../interfaces/customer-interface";
import {RestaurantOwner} from "../interfaces/restaurantOwner-interface";
import {CookieService} from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | Customer | RestaurantOwner>;
  public currentUser: Observable<User | Customer | RestaurantOwner>;


  constructor(private cookies: CookieService)
  {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | Customer | RestaurantOwner>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public setCurrentUser(user: User | Customer | RestaurantOwner | null): void {
    this.currentUserSubject.next(user as User | Customer | RestaurantOwner);
  }

  public getCurrentUser(): Observable<User | Customer | RestaurantOwner | null> {
    return this.currentUserSubject.asObservable();
  }

  forgetUser() {
    localStorage.removeItem('currentUser')
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

}
