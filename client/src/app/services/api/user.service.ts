import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user-interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  headers: HttpHeaders;
  requestOptions;
  private apiUrl = `${environment.apiUrl}/users`;

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

  login(user: User): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<any>(url, user, this.requestOptions);
  }

  logout(): Observable<void> {
    const url = `${this.apiUrl}/logout`;
    return this.http.post<void>(url, null, this.requestOptions);
  }

  deleteUser(user: User): Observable<void> {
    const url = `${this.apiUrl}/delete/${user.user_id}`;
    return this.http.delete<void>(url, this.requestOptions);
  }
}
