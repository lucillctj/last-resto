import { Component } from '@angular/core';
import {RestaurantOwner} from "../../interfaces/restaurantOwner-interface";
import {RestaurantOwnerService} from "../../services/api/restaurant-owner.service";

@Component({
  selector: 'app-create-account-restaurant',
  templateUrl: './create-account-restaurant.component.html',
  styleUrls: ['./create-account-restaurant.component.css', '../../../styles.css']
})
export class CreateAccountRestaurantComponent {
  newUser: RestaurantOwner;
  successMessage: string | null;
  errorMessage: string| null;
  constructor(private restaurantOwnerService: RestaurantOwnerService) {
    this.newUser = {} as RestaurantOwner;
    this.successMessage = null;
    this.errorMessage = null;
  }

  createAccountRestaurantOwner(newUser: RestaurantOwner){
    this.restaurantOwnerService.createRestaurantOwner(newUser)
      .subscribe((response) => {
          this.successMessage = 'Votre compte a bien été créé !';
          // envoyer sur la page du profil
        },
        error => {
          if (error.status === 400 && error.error === "Cet email existe déjà !") {
            this.errorMessage = 'Cet email existe déjà !';
          } else if (error.status === 400 && error.error === "Ce numéro de téléphone existe déjà !") {
            this.errorMessage = 'Ce numéro de téléphone existe déjà !';
          } else if (error.status === 400) {
            this.errorMessage = 'Certains champs sont manquants ou incorrects !';
          } else {
            this.errorMessage = 'Erreur lors de l\'inscription, veuillez rééssayer ultérieurement.';
          }
        }
      )
  }
}
