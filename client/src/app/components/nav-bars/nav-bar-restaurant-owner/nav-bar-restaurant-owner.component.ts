import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import {PopupInformationComponent} from "../../popups/restaurant/popup-information/popup-information.component";
import {Restaurant} from "../../../interfaces/restaurant-interface";
import {RestaurantOwner} from "../../../interfaces/restaurantOwner-interface";

@Component({
  selector: 'app-nav-bar-restaurant-owner',
  templateUrl: './nav-bar-restaurant-owner.component.html',
  styleUrls: ['./nav-bar-restaurant-owner.component.scss', '../../../../styles.scss']
})
export class NavBarRestaurantOwnerComponent implements OnInit{
  isRestaurantDashboardActive: boolean;
  isUserDashboardActive: boolean;
  currentRestaurantOwner: RestaurantOwner;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal,
  ) {
    this.isRestaurantDashboardActive = false;
    this.isUserDashboardActive = false;
    this.currentRestaurantOwner = {} as RestaurantOwner;
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
    this.authService.getCurrentUser().subscribe(user => {
      this.currentRestaurantOwner = user as RestaurantOwner;
    });
    const urlUserDashboard = `/api/v1/restaurant-owners/dashboard/${this.currentRestaurantOwner.user_id}`;

    if (this.router.url === urlUserDashboard) {
      return;
    } else {
      this.router.navigate([urlUserDashboard]);
    }
  }
}
