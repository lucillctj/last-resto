import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-nav-bar-restaurant-owner',
  templateUrl: './nav-bar-restaurant-owner.component.html',
  styleUrls: ['./nav-bar-restaurant-owner.component.scss', '../../../../styles.scss']
})
export class NavBarRestaurantOwnerComponent implements OnInit{
  isRestaurantDashboardActive: boolean;
  isUserDashboardActive: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.isRestaurantDashboardActive = false;
    this.isUserDashboardActive = false;
  }

  ngOnInit(){
    if (this.router.url.includes('/api/v1/restaurants/dashboard/')) {
      this.isRestaurantDashboardActive = true;
    }
    else if (this.router.url.includes('/api/v1/restaurant-owners/dashboard')) {
      this.isUserDashboardActive = true;
    }
  }

  // redirectToReservationsDashboard() {
  //   const currentRestaurantId = this.authService.getCurrentRestaurantId();
  //
  //   const redirectUrl = `/api/v1/restaurants/${currentRestaurantId}`;
  //   if (this.router.url === redirectUrl) {
  //     this.isSearchActive = true;
  //   } else {
  //     this.isSearchActive = false;
  //     this.router.navigate([redirectUrl]);
  //   }
  // }

  redirectToRestaurantDashboard() {
    const currentRestaurantId = this.authService.getCurrentRestaurantId();
    const urlRestaurantDashboard = `/api/v1/restaurants/dashboard/${currentRestaurantId}`;

    if (this.router.url === urlRestaurantDashboard) {
      return
    } else {
      this.router.navigate([urlRestaurantDashboard]);
    }
  }

  redirectToUserDashboard() {
    const currentUserId = this.authService.getCurrentUserId();
    const urlUserDashboard = `/api/v1/restaurant-owners/dashboard/${currentUserId}`;

    if (this.router.url === urlUserDashboard) {
      return
    } else {
      this.router.navigate([urlUserDashboard]);
    }
  }
}
