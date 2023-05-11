import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
// import {UserRoleService} from "../../services/user-role.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../styles.scss']
})
export class HomeComponent {
  constructor(private router: Router) {
  }

  loginToUserAccount(){
    this.router.navigate(['/api/v1/users/login'])
  }

  showFormToCreateAccountCustomer(){
    // this.userRoleService.userRole = 'customer';
    // this.userRoleService.userRoleChanged.emit(this.userRoleService.userRole);
    this.router.navigate(['/api/v1/customers/signup']);
  }

  showFormToCreateAccountRestaurant(){
    // this.userRoleService.userRole = 'restaurant owner';
    // this.userRoleService.userRoleChanged.emit(this.userRoleService.userRole);
    this.router.navigate(['api/v1/restaurant-owners/signup']);
  }
}
