import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-nav-bar-restaurant-owner',
  templateUrl: './nav-bar-restaurant-owner.component.html',
  styleUrls: ['./nav-bar-restaurant-owner.component.scss', '../../../../styles.scss']
})
export class NavBarRestaurantOwnerComponent {
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
console.log(currentRestaurantId)
    const redirectUrl = `/api/v1/restaurants/dashboard/${currentRestaurantId}`;
    if (this.router.url === redirectUrl) {
      this.isSearchActive = true;
    } else {
      this.isSearchActive = false;
      this.router.navigate([redirectUrl]);
    }
  }

  redirectToUserDashboard() {
    const currentUserId = this.authService.getCurrentUserId();
    const redirectUrl = `/api/v1/restaurant-owners/dashboard/${currentUserId}`;
    if (this.router.url === redirectUrl) {
      this.isDashboardActive = true;

    } else {
      this.isDashboardActive = false;
      this.router.navigate([redirectUrl]);
    }
  }
}
