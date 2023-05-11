import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss', '../../../styles.scss']
})
export class NavBarComponent {
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


  redirectToRestaurantSearch() {
    const redirectUrl = `/api/v1/customers/restaurants-search`;
    if (this.router.url === redirectUrl) {
      this.isSearchActive = true;
    } else {
      this.isSearchActive = false;
      this.router.navigate([redirectUrl]);
    }
  }

  redirectToDashboard() {
    const currentUserId = this.authService.getCurrentUserId();
    const redirectUrl = `/api/v1/customers/dashboard/${currentUserId}`;
    if (this.router.url === redirectUrl) {
      this.isDashboardActive = true;

    } else {
      this.isDashboardActive = false;
      this.router.navigate([redirectUrl]);
    }
  }
}
