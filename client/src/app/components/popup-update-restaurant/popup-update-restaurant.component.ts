import { Component } from '@angular/core';
import {RestaurantOwner} from "../../interfaces/restaurantOwner-interface";
import {RestaurantOwnerService} from "../../services/api/restaurant-owner.service";
import {Restaurant} from "../../interfaces/restaurant-interface";
import { Router } from '@angular/router';
import {RestaurantService} from "../../services/api/restaurant.service";

@Component({
  selector: 'app-popup-update-restaurant',
  templateUrl: './popup-update-restaurant.component.html',
  styleUrls: ['./popup-update-restaurant.component.scss']
})
export class PopupUpdateRestaurantComponent {
  updatedRestaurant: Restaurant;
  successMessage: string | null;
  errorMessage: string| null;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router) {
    this.updatedRestaurant = {} as Restaurant;
    this.successMessage = null;
    this.errorMessage = null;
  }

  updateRestaurant(updatedRestaurant: Restaurant){
    this.restaurantService.updateRestaurant(updatedRestaurant)
      .subscribe(() => {
          this.successMessage = 'Vos informations ont bien été mises à jour !';
          this.router.navigate(['/api/v1/restaurants/dashboard/:id']);
        },
        error => {
          this.errorMessage = 'Erreur lors de la mise à jour, veuillez rééssayer ultérieurement.';
        })
  }
}
