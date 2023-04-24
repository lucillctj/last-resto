import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  public userRole: string = 'customer' || 'restaurant owner';
  public userRoleChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }
}
