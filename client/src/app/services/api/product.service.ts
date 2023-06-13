import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from "../../interfaces/product-interface";

@Injectable(
  {providedIn: 'root'}
)
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/v1/products';

  constructor(private http: HttpClient) { }

  createProduct(product: Product, userId: number): Observable<any> {
    const url = `${this.apiUrl}/create/user/${userId}`;
    return this.http.post<any>(url, product, {withCredentials: true});
  }

  getProductsByRestaurantId(restaurantId: number, userId: number): Observable<Product[]> {
    const url = `${this.apiUrl}/restaurant/${restaurantId}/user/${userId}`;
    return this.http.get<Product[]>(url, {withCredentials: true});
  }

  getRestaurantIdByProductId(productId: number, userId: number): Observable<Product> {
    const url = `${this.apiUrl}/${productId}/restaurant/user/${userId}`;
    return this.http.get<Product>(url, {withCredentials: true});
  }

  getProductById(productId: number, userId: number): Observable<Product> {
    const url = `${this.apiUrl}/${productId}/user/${userId}`;
    return this.http.get<Product>(url, {withCredentials: true});
  }

  // updateProduct(product: Product, userId: number): Observable<any> {
  //   const url = `${this.apiUrl}/update/${product.product_id}/user/${userId}`;
  //   return this.http.put<any>(url, product, {withCredentials: true});
  // }

  deleteProduct(product: Product, userId: number): Observable<void> {
    const url = `${this.apiUrl}/delete/${product.product_id}/user/${userId}`;
    return this.http.delete<void>(url, {withCredentials: true});
  }
}
