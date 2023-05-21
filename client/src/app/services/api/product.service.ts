import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from "../../interfaces/product-interface";

@Injectable(
  {providedIn: 'root'}
)
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/v1/products';

  constructor(private http: HttpClient) { }

  createProduct(product: Product): Observable<any> {
    const url = `${this.apiUrl}/create`;
    return this.http.post<any>(url, product);
  }

  getProductsByRestaurantId(restaurantId: number): Observable<Product[]> {
    const url = `${this.apiUrl}/restaurant/${restaurantId}`;
    return this.http.get<Product[]>(url);
  }

  //pour récupérer les produits réservés par les clients
  getProductsByUserId(userId: number): Observable<Product[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<Product[]>(url);
  }

  // getProductDashboard(productId: number): Observable<any> {
  //   const url = `${this.apiUrl}/dashboard/${productId}`;
  //   return this.http.get<any>(url);
  // }

  getAllProducts(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get<any>(url);
  }

  updateProduct(product: Product): Observable<any> {
    const url = `${this.apiUrl}/update/${product.product_id}`;
    return this.http.put<any>(url, product);
  }

  deleteProduct(product: Product): Observable<void> {
    const url = `${this.apiUrl}/delete/${product.product_id}`;
    return this.http.delete<void>(url);
  }
}
