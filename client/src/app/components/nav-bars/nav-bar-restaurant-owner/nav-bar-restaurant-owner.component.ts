import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import {PopupInformationComponent} from "../../popups/restaurant/popup-information/popup-information.component";
import {Restaurant} from "../../../interfaces/restaurant-interface";

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
    private authService: AuthService,
    private modalService: NgbModal,
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

  redirectToRestaurantDashboard() {
    const currentRestaurant: Restaurant = this.authService.getCurrentRestaurant();
    const urlRestaurantDashboard = `/api/v1/restaurants/dashboard/${currentRestaurant.restaurant_id}`;

    if (this.router.url === urlRestaurantDashboard) {
      return
    } else if(currentRestaurant.restaurant_id) {
      this.router.navigate([urlRestaurantDashboard]);
    }
    else{
        this.modalService.open(PopupInformationComponent);
    }
  }

  redirectToUserDashboard() {
    const currentUser = this.authService.getCurrentUser();
    const urlUserDashboard = `/api/v1/restaurant-owners/dashboard/${currentUser.user_id}`;

    if (this.router.url === urlUserDashboard) {
      return
    } else {
      this.router.navigate([urlUserDashboard]);
    }
  }
}
