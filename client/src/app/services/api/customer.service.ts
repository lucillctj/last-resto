import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from "../../interfaces/customer-interface";
import {Product} from "../../interfaces/product-interface";
import {User} from "../../interfaces/user-interface";


@Injectable(
  {providedIn: 'root'}
)
export class CustomerService {
  private apiUrl = 'http://localhost:3000/api/v1/customers';

  constructor(private http: HttpClient) { }

  createCustomer(user: Customer): Observable<any> {
    const url = `${this.apiUrl}/signup`;
    return this.http.post<any>(url, user, {withCredentials: true});
  }

  getCustomerDashboard(userId: number): Observable<Customer> {
    const url = `${this.apiUrl}/dashboard/${userId}`;
    return this.http.get<Customer>(url, { withCredentials: true });
  }

  getDataCustomer(userId: number, restaurantOwnerId: number): Observable<Customer> {
    const url = `${this.apiUrl}/data/customer/${userId}/${restaurantOwnerId}`;
    return this.http.get<Customer>(url, { withCredentials: true });
  }

  getUserIdByProductId(product: Product, userId: number): Observable<any> {
    const url = `${this.apiUrl}/${product.product_id}/get-user/user/${userId}`;
    return this.http.get<any>(url, {withCredentials: true});
  }

  updateCustomer(updatedUser: Customer, currentUser: Customer): Observable<any> {
    const url = `${this.apiUrl}/update/${currentUser.user_id}`;
    return this.http.put<any>(url, updatedUser, {withCredentials: true});
  }

  updateProductId(userId: number | undefined, productId: number | null | undefined): Observable<any> {
    const url = `${this.apiUrl}/update-product-id/${userId}`;
    console.log(url)
    return this.http.put<any>(url, {productId}, {withCredentials: true});
  }

  //pour récupérer les produits réservés par les clients
  getProductIdByUserId(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}/product`;
    return this.http.get<any>(url, {withCredentials: true});
  }
}
