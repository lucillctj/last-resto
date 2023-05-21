import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../interfaces/user-interface";

@Component({
  selector: 'app-nav-bar-customer',
  templateUrl: './nav-bar-customer.component.html',
  styleUrls: ['./nav-bar-customer.component.scss', '../../../../styles.scss']
})
export class NavBarCustomerComponent implements OnInit{
  isSearchActive: boolean;
  isDashboardActive: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.isSearchActive = false;
    this.isDashboardActive = false;
  }

  ngOnInit(){
    if (this.router.url.includes('/api/v1/restaurants')) {
      this.isSearchActive = true;
    }
    else if (this.router.url.includes('/api/v1/customers/dashboard')) {
      this.isDashboardActive = true;
    }
  }

  redirectToRestaurantSearch() {
    const redirectUrl = `/api/v1/restaurants`;
    if (this.router.url === redirectUrl) {
      this.isSearchActive = true;
    } else {
      this.isSearchActive = false;
      this.router.navigate([redirectUrl]);
    }
  }

  redirectToDashboard() {
    const currentUser: User = this.authService.getCurrentUser();
    const redirectUrl = `/api/v1/customers/dashboard/${currentUser.user_id}`;
    if (this.router.url === redirectUrl) {
      this.isDashboardActive = true;

    } else {
      this.isDashboardActive = false;
      this.router.navigate([redirectUrl]);
    }
  }
}
