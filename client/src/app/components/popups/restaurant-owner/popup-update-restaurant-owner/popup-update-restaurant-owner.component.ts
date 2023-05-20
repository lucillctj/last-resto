import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {RestaurantOwner} from "../../../../interfaces/restaurantOwner-interface";
import {RestaurantOwnerService} from "../../../../services/api/restaurant-owner.service";
import {Restaurant} from "../../../../interfaces/restaurant-interface";


@Component({
  selector: 'app-popup-update-customer',
  templateUrl: './popup-update-restaurant-owner.component.html',
  styleUrls: ['./popup-update-restaurant-owner.component.scss', '../../../../../styles.scss']
})
export class PopupUpdateRestaurantOwnerComponent {
  @Input() currentRestaurant!: Restaurant;

  updatedUser: RestaurantOwner;
  successMessage: string | null;
  errorMessage: string| null;

  constructor(
    private restaurantOwnerService: RestaurantOwnerService,
    private router: Router) {
    this.updatedUser = {} as RestaurantOwner;
    this.successMessage = null;
    this.errorMessage = null;
  }

  updateAccount(updatedUser: RestaurantOwner){
    this.restaurantOwnerService.updateRestaurantOwner(updatedUser)
      .subscribe(() => {
          this.successMessage = 'Vos informations ont bien été mises à jour !';
          this.router.navigate([`/api/v1/restaurant-owners/dashboard/${this.currentRestaurant.user_id}`]);
        },
        error => {
          if (error.status === 400 && error.error === "Cet email existe déjà !") {
            this.errorMessage = 'Cet email existe déjà !';
          }
          else if (error.status === 400 && error.error === "Ce numéro de téléphone existe déjà !") {
            this.errorMessage = 'Ce numéro de téléphone existe déjà !';
          }
          else{
            this.errorMessage = 'Erreur lors de la mise à jour, veuillez rééssayer ultérieurement.';
          }
        }
      )
  }
}
