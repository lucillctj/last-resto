import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {UserRoleService} from "../../services/user-role.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../styles.scss']
})
export class HomeComponent {
  constructor(private router: Router, private userRoleService: UserRoleService) {
  }
  showFormToCreateAccountCustomer(){
    this.userRoleService.userRole = 'customer';
    this.userRoleService.userRoleChanged.emit(this.userRoleService.userRole);
    this.router.navigate(['/signup-customer']);
  }

  showFormToCreateAccountRestaurant(){
    this.userRoleService.userRole = 'restaurant owner';
    this.userRoleService.userRoleChanged.emit(this.userRoleService.userRole);
    this.router.navigate(['/signup-restaurant-owner']);
  }
}
