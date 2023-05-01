import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable(
  // {providedIn: 'root'}
)
export class UserService {
  private apiUrl = 'http://localhost:3000/api/v1/user';

  constructor(private http: HttpClient) { }

  logout(): Observable<void> {
    const url = `${this.apiUrl}/logout`;
    return this.http.post<void>(url, null);
  }
}
