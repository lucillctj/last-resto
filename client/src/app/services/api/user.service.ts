import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "../../interfaces/user-interface";

@Injectable(
  {providedIn: 'root'}
)

export class UserService {
  private apiUrl = 'http://localhost:3000/api/v1/users';

  constructor(private http: HttpClient) { }

  login(user: User) {
    const url = `${this.apiUrl}/login`;
    return this.http.post<any>(url, user, {withCredentials: true});
  }

  logout(): Observable<void> {
    const url = `${this.apiUrl}/logout`;
    return this.http.post<void>(url, null, {withCredentials: true});
  }

  deleteUser(user: User): Observable<void> {
    const url = `${this.apiUrl}/delete/${user.user_id}`;
    return this.http.delete<void>(url, {withCredentials: true});
  }
}
