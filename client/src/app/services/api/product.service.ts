import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from "../../interfaces/product-interface";
import {Restaurant} from "../../interfaces/restaurant-interface";

@Injectable(
  {providedIn: 'root'}
)
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/v1/products';

  constructor(private http: HttpClient) { }

  createProduct(product: Product): Observable<any> {
    const url = `${this.apiUrl}/create`;
    return this.http.post<any>(url, product, {withCredentials: true});
  }

  getProductsByRestaurantId(restaurantId: number): Observable<Product[]> {
    const url = `${this.apiUrl}/restaurant/${restaurantId}`;
    return this.http.get<Product[]>(url, {withCredentials: true});
  }

  getRestaurantIdByProductId(productId: number): Observable<Product> {
    const url = `${this.apiUrl}/${productId}/restaurant`;
    return this.http.get<Product>(url, {withCredentials: true});
  }

  getProductById(productId: number): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<Product>(url, {withCredentials: true});
  }

  updateProduct(product: Product): Observable<any> {
    const url = `${this.apiUrl}/update/${product.product_id}`;
    return this.http.put<any>(url, product, {withCredentials: true});
  }

  deleteProduct(product: Product): Observable<void> {
    const url = `${this.apiUrl}/delete/${product.product_id}`;
    return this.http.delete<void>(url, {withCredentials: true});
  }
}
