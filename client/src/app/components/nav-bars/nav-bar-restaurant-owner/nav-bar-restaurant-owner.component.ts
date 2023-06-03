import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import {PopupInformationComponent} from "../../popups/restaurant/popup-information/popup-information.component";
import {Restaurant} from "../../../interfaces/restaurant-interface";
import {RestaurantOwner} from "../../../interfaces/restaurantOwner-interface";
import {RestaurantService} from "../../../services/api/restaurant.service";

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
    const currentUserId = parseInt(this.route.snapshot.paramMap.get("id")!);
    console.log(currentUserId)
    if (currentUserId) {
      this.restaurantService.getRestaurantByUserId(currentUserId)
        .subscribe(
          (data) => {
            this.currentRestaurant = data[0];

            if(!this.currentRestaurant.restaurant_id){
              this.modalService.open(PopupInformationComponent);
              return;
            }
            else if (this.router.url === urlRestaurantDashboard) {
              return;
            }
            else{
              const urlRestaurantDashboard = `/api/v1/restaurants/dashboard/${this.currentRestaurant.restaurant_id}`;
              this.router.navigate([urlRestaurantDashboard]);
            }

          },
          (error) => {
            console.error('Une erreur s\'est produite lors de la récupération des données du restaurant.', error);
          })
    } else {
      console.error('L\'ID du restaurant n\'est pas un nombre valide.');
    }

    const urlRestaurantDashboard = `/api/v1/restaurants/dashboard/${this.currentRestaurant.restaurant_id}`;
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
