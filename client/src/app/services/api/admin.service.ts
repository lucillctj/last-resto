import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../../interfaces/admin-interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admins`;

  constructor(private http: HttpClient) {}
  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.apiUrl);
  }

  getAdminDashboard(userId: number): Observable<any> {
    const url = `${this.apiUrl}/dashboard/${userId}`;
    return this.http.get<any>(url);
  }

  updateAdmin(user: Admin): Observable<any> {
    const url = `${this.apiUrl}/update/${user.user_id}`;
    return this.http.put<any>(url, user);
  }
}
