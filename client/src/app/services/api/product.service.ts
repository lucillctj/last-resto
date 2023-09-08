import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product-interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  headers: HttpHeaders;
  requestOptions;
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      'Accept-Language': 'fr-FR',
      'X-Requested-With': 'XMLHttpRequest',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Content-Security-Policy':
        "default-src https:; script-src https: 'nonce-random'",
      'X-Frame-Options': 'SAMEORIGIN',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
    });
    this.requestOptions = { withCredentials: true, headers: this.headers };
  }

  createProduct(product: Product, userId: number): Observable<any> {
    const url = `${this.apiUrl}/create/user/${userId}`;
    return this.http.post<any>(url, product, this.requestOptions);
  }

  getProductsByRestaurantId(
    restaurantId: number,
    userId: number
  ): Observable<Product[]> {
    const url = `${this.apiUrl}/restaurant/${restaurantId}/user/${userId}`;
    return this.http.get<Product[]>(url, this.requestOptions);
  }

  getRestaurantIdByProductId(
    productId: number,
    userId: number
  ): Observable<Product> {
    const url = `${this.apiUrl}/${productId}/restaurant/user/${userId}`;
    return this.http.get<Product>(url, this.requestOptions);
  }

  getProductById(productId: number, userId: number): Observable<Product> {
    const url = `${this.apiUrl}/${productId}/user/${userId}`;
    return this.http.get<Product>(url, this.requestOptions);
  }

  deleteProduct(product: Product, userId: number): Observable<void> {
    const url = `${this.apiUrl}/delete/${product.product_id}/user/${userId}`;
    return this.http.delete<void>(url, this.requestOptions);
  }
}
