import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Customer} from "../../interfaces/customer-interface";

@Injectable(
  // {providedIn: 'root'}
)
export class CustomerService {
  private apiUrl = 'http://localhost:3000/api/v1/customer';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getCustomerById(userId: number): Observable<Customer> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<Customer>(url);
  }

  createCustomer(user: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, user);
  }

  updateCustomer(user: Customer): Observable<Customer> {
    const url = `${this.apiUrl}/${user.userId}`;
    return this.http.put<Customer>(url, user);
  }

  deleteCustomer(userId: number): Observable<void> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<void>(url);
  }
}