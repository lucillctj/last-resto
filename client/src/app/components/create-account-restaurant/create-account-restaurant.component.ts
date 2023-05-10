import { Component } from '@angular/core';
import {RestaurantOwner} from "../../interfaces/restaurantOwner-interface";
import {RestaurantOwnerService} from "../../services/api/restaurant-owner.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account-restaurant',
  templateUrl: './create-account-restaurant.component.html',
  styleUrls: ['./create-account-restaurant.component.scss', '../../../styles.scss']
})
export class CreateAccountRestaurantComponent {
  submitted = false;
  newUser: RestaurantOwner;
  errorMessageEmail: string | null;
  errorMessagePhone: string | null;
  errorMessage: string | null;

  constructor(
    private restaurantOwnerService: RestaurantOwnerService,
    private router: Router
  ) {
    this.newUser = {} as RestaurantOwner;
    this.errorMessageEmail = null;
    this.errorMessagePhone = null;
    this.errorMessage = null;
  }

  onSubmit() {
    this.submitted = true;
    this.restaurantOwnerService.createRestaurantOwner(this.newUser)
      .subscribe((res) => {
          this.router.navigate([`/api/v1/restaurant-owners/dashboard/${res.userId}`]);
        },
        error => {
          if (error.status === 400 && error.error === "Cet email existe déjà !") {
            this.errorMessageEmail = 'Cet email existe déjà !';
          } else if (error.status === 400 && error.error === "Ce numéro de téléphone existe déjà !") {
            this.errorMessagePhone = 'Ce numéro de téléphone existe déjà !';
          } else {
            this.errorMessage = 'Erreur lors de l\'inscription, veuillez rééssayer ultérieurement.';
          }
        }
      )
  }
}
