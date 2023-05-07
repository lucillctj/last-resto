import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {RestaurantOwner} from "../../interfaces/restaurantOwner-interface";
import {RestaurantOwnerService} from "../../services/api/restaurant-owner.service";


@Component({
  selector: 'app-popup-update-customer',
  templateUrl: './popup-update-restaurant-owner.component.html',
  styleUrls: ['./popup-update-restaurant-owner.component.scss', '../../../styles.scss']
})
export class PopupUpdateRestaurantOwnerComponent {

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

  updateAccountCustomer(updatedUser: RestaurantOwner){
    this.restaurantOwnerService.updateRestaurantOwner(updatedUser)
      .subscribe(() => {
          this.successMessage = 'Vos informations ont bien été mises à jour !';
          this.router.navigate(['/customer-profil']);
        },
        error => {
          if (error.status === 400 && error.error === "Cet email existe déjà !") {
            this.errorMessage = 'Cet email existe déjà !';
          }
          else if (error.status === 400 && error.error === "Ce numéro de téléphone existe déjà !") {
            this.errorMessage = 'Ce numéro de téléphone existe déjà !';
          }
          else if (error.status === 400){
            this.errorMessage = 'Certains champs sont manquants ou incorrects !';
          }
          else{
            this.errorMessage = 'Erreur lors de l\'inscription, veuillez rééssayer ultérieurement.';
          }
        }
      )
  }
}
