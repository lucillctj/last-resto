import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../interfaces/customer-interface';
import { Product } from '../../interfaces/product-interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  headers: HttpHeaders;
  requestOptions;
  private apiUrl = `${environment.apiUrl}/customers`;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Accept-Language': 'fr-FR',
      'X-Requested-With': 'XMLHttpRequest',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Content-Security-Policy':
        "default-src https:; script-src https: 'nonce-random'",
      'X-Frame-Options': 'SAMEORIGIN',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'Permissions-Policy': 'geolocation=(self)'
    });
    this.requestOptions = { withCredentials: true, headers: this.headers };
  }

  createCustomer(user: Customer): Observable<any> {
    const url = `${this.apiUrl}/signup`;
    return this.http.post<any>(url, user, this.requestOptions);
  }

  getCustomerDashboard(userId: number): Observable<Customer> {
    const url = `${this.apiUrl}/dashboard/${userId}`;
    return this.http.get<Customer>(url, this.requestOptions);
  }

  getDataCustomer(
    userId: number,
    restaurantOwnerId: number
  ): Observable<Customer> {
    const url = `${this.apiUrl}/data/customer/${userId}/${restaurantOwnerId}`;
    return this.http.get<Customer>(url, this.requestOptions);
  }

  getUserIdByProductId(product: Product, userId: number): Observable<any> {
    const url = `${this.apiUrl}/${product.product_id}/get-user/user/${userId}`;
    return this.http.get<any>(url, this.requestOptions);
  }

  updateCustomer(
    updatedUser: Customer,
    currentUser: Customer
  ): Observable<any> {
    const url = `${this.apiUrl}/update/${currentUser.user_id}`;
    return this.http.put<any>(url, updatedUser, this.requestOptions);
  }

  updateProductId(
    userId: number | undefined,
    productId: number | null | undefined
  ): Observable<void> {
    const url = `${this.apiUrl}/update-product-id/${userId}`;
    return this.http.put<void>(url, { productId }, this.requestOptions);
  }

  //pour récupérer les produits réservés par les clients
  getProductIdByUserId(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}/product`;
    return this.http.get<any>(url, this.requestOptions);
  }
}
