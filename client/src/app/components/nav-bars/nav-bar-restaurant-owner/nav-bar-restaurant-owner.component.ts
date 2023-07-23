import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import {PopupInformationComponent} from "../../popups/restaurant/popup-information/popup-information.component";
import {Restaurant} from "../../../interfaces/restaurant-interface";
import {RestaurantOwner} from "../../../interfaces/restaurantOwner-interface";
import {RestaurantService} from "../../../services/api/restaurant.service";
import {
  RedirectToCreateAccountComponent
} from "../../popups/user/redirect-to-create-account/redirect-to-create-account.component";

@Component({
  selector: 'app-nav-bar-restaurant-owner',
  templateUrl: './nav-bar-restaurant-owner.component.html',
  styleUrls: ['./nav-bar-restaurant-owner.component.scss', '../../../../styles.scss']
})
export class NavBarRestaurantOwnerComponent implements OnInit{
  isRestaurantDashboardActive: boolean;
  isUserDashboardActive: boolean;
  currentRestaurantOwner: RestaurantOwner;
  currentRestaurant: Restaurant;
  currentUserId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal,
    private restaurantService: RestaurantService
  ) {
    this.isRestaurantDashboardActive = false;
    this.isUserDashboardActive = false;
    this.currentRestaurantOwner = {} as RestaurantOwner;
    this.currentRestaurant = {} as Restaurant;
    this.currentUserId = parseInt(this.route.snapshot.paramMap.get("user")!);
  }

  ngOnInit(){
    if (this.router.url.includes('/api/v1/restaurants/dashboard')) {
      this.isRestaurantDashboardActive = true;
    }
    else if (this.router.url.includes('/api/v1/restaurant-owners/dashboard')) {
      this.isUserDashboardActive = true;
    }
  }

  redirectToRestaurantDashboard() {
    if (this.currentUserId) {
      this.restaurantService.getRestaurantByUserId(this.currentUserId)
        .subscribe(
          (data) => {
            this.currentRestaurant = data[0];
            if(data.length === 0){
              this.modalService.open(PopupInformationComponent);
            }
            else{
              const urlRestaurantDashboard = `/api/v1/restaurants/dashboard/${this.currentRestaurant.restaurant_id}/user/${this.currentRestaurant.restaurant_owner_id}`;
              this.router.navigate([urlRestaurantDashboard]);
            }

          },
          (error) => {
            console.error('Une erreur s\'est produite lors de la récupération des données du restaurant.', error);
          })
    } else {
      console.error('L\'ID du restaurant n\'est pas un nombre valide.');
    }
  }

  redirectToRestaurantOwnerDashboard() {
    const urlRestaurantOwnerDashboard = `/api/v1/restaurant-owners/dashboard/${this.currentUserId}`;

    if (this.router.url === urlRestaurantOwnerDashboard) {
      return;
    } else if (this.currentUserId) {
      this.router.navigate([urlRestaurantOwnerDashboard]);
    }
    else {
      this.modalService.open(RedirectToCreateAccountComponent)
    }
  }
}
