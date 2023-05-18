import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import {CustomerService} from "../../../services/api/customer.service";
import {AuthService} from "../../../services/auth.service";
import {PopupUpdateRestaurantOwnerComponent} from "../../../components/popup-update-restaurant-owner/popup-update-restaurant-owner.component";
import { Router } from '@angular/router';
import {RestaurantService} from "../../../services/api/restaurant.service";
import {Restaurant} from "../../../interfaces/restaurant-interface";
import {
  PopupCreateRestaurantComponent
} from "../../../components/popup-create-restaurant/popup-create-restaurant.component";
import {RestaurantOwnerService} from "../../../services/api/restaurant-owner.service";
import {RestaurantOwner} from "../../../interfaces/restaurantOwner-interface";

@Component({
  selector: 'app-restaurant-owner-dashboard',
  templateUrl: './restaurant-owner-dashboard.component.html',
  styleUrls: ['./restaurant-owner-dashboard.component.scss', '../../../../styles.scss']
})
export class RestaurantOwnerDashboardComponent implements OnInit {
  currentUser: RestaurantOwner;
  currentRestaurant: Restaurant;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private restaurantOwnerService: RestaurantOwnerService,
    private restaurantService: RestaurantService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    this.currentUser = {} as RestaurantOwner;
    this.currentRestaurant = {} as Restaurant;
  }

  ngOnInit(){
    const currentUserId = parseInt(this.route.snapshot.paramMap.get("id")!);
    if (currentUserId) {
      this.authService.setCurrentUserId(currentUserId);
      this.restaurantOwnerService.getRestaurantOwnerDashboard(currentUserId)
        .subscribe((data) => {
            this.currentUser = data.results[0];
          },
          (error) => {
            console.error('Une erreur s\'est produite lors de la récupération des données de l\'utilisateur.', error);
          })
      this.restaurantService.getRestaurantByUserId(currentUserId)
        .subscribe((data) => {
            this.currentRestaurant = data.results[0];
            this.authService.setCurrentRestaurantId(this.currentRestaurant.restaurant_id);

          },
          (error) => {
            console.error('Une erreur s\'est produite lors de la récupération des données du restaurant :', error);
          })
    } else {
      console.error('L\'ID du client n\'est pas un nombre valide.');
    }

  }

  openPopupToUpdate() {
    this.modalService.open(PopupUpdateRestaurantOwnerComponent);
  }
  showRestaurantPage(restaurantId: number | undefined) {
    this.router.navigate([`api/v1/restaurants/dashboard/${restaurantId}`]);
  }

  openPopupToCreateRestaurant(){
    this.modalService.open(PopupCreateRestaurantComponent);
  }
}
