import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Admin} from "../../interfaces/admin-interface";

@Injectable(
  // {providedIn: 'root'}
)
export class AdminService {
  private apiUrl = 'http://localhost:3000/api/v1/admin';

  constructor(private http: HttpClient) { }

  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.apiUrl);
  }

  getAdminDashboard(userId: number): Observable<Admin> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<Admin>(url);
  }

  createAdmin(user: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.apiUrl, user);
  }

  updateAdmin(user: Admin): Observable<Admin> {
    const url = `${this.apiUrl}/${user.userId}`;
    return this.http.put<Admin>(url, user);
  }

  deleteAdmin(userId: number): Observable<void> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<void>(url);
  }
}
