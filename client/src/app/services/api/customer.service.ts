import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Customer} from "../../interfaces/customer-interface";
import {AuthService} from "../auth.service";


@Injectable(
  {providedIn: 'root'}
)
export class CustomerService {
  private apiUrl = 'http://localhost:3000/api/v1/customers';

  constructor(private http: HttpClient, private authService: AuthService) { }

  createCustomer(user: Customer): Observable<Customer> {
    const url = `${this.apiUrl}/signup`;
    // this.authService.setCurrentUserId(user.userId);
    return this.http.post<Customer>(url, user, {withCredentials: true});
  }

  // login(user: Customer): Observable<Customer> {
  //   const url = `${this.apiUrl}/login`;
  //   // this.authService.setCurrentUserId(user.userId);
  //   return this.http.post<Customer>(url, user, {withCredentials: true});
  // }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getCustomerDashboard(userId: number): Observable<any> {
    const url = `${this.apiUrl}/dashboard/${userId}`;
    return this.http.get<Customer>(url);
  }

  updateCustomer(user: Customer): Observable<Customer> {
    const url = `${this.apiUrl}/update/${user.userId}`;
    return this.http.put<Customer>(url, user);
  }

  deleteCustomer(userId: number): Observable<void> {
    const url = `${this.apiUrl}/delete/${userId}`;
    return this.http.delete<void>(url);
  }
}
