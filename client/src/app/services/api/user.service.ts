import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../../interfaces/user-interface";

@Injectable(
  {providedIn: 'root'}
)

export class UserService {
  private apiUrl = 'http://localhost:3000/api/v1/users';

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<User>(url, user, {withCredentials: true});
  }

  logout(): Observable<void> {
    const url = `${this.apiUrl}/logout`;
    return this.http.post<void>(url, null);
  }
}
