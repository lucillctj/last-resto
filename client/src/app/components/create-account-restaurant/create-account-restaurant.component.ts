import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestaurantOwner } from '../../interfaces/restaurantOwner-interface';
import { RestaurantOwnerService } from '../../services/api/restaurant-owner.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-account-restaurant',
  templateUrl: './create-account-restaurant.component.html',
  styleUrls: [
    './create-account-restaurant.component.scss',
    '../../../styles.scss'
  ]
})
export class CreateAccountRestaurantComponent {
  submitted = false;
  newUser: RestaurantOwner;
  errorMessageEmail: string | null;
  errorMessagePhone: string | null;
  errorMessage: string | null;
  isPrivacyPolicyAccepted: boolean = false;

  constructor(
    private restaurantOwnerService: RestaurantOwnerService,
    private router: Router,
    private authService: AuthService
  ) {
    this.newUser = {} as RestaurantOwner;
    this.errorMessageEmail = null;
    this.errorMessagePhone = null;
    this.errorMessage = null;
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (!form.valid || this.isPrivacyPolicyAccepted === false) {
      return;
    }

    this.restaurantOwnerService.createRestaurantOwner(this.newUser).subscribe({
      next: (res) => {
        this.authService.setCurrentUser(this.newUser);
        this.router.navigate([`/restaurant-owners/dashboard/${res.userId}`]);
      },
      error: (error) => {
        if (error.status === 400 && error.error === 'Cet email existe déjà !') {
          this.errorMessageEmail = 'Cet email existe déjà !';
        } else if (
          error.status === 400 &&
          error.error === 'Ce numéro de téléphone existe déjà !'
        ) {
          this.errorMessagePhone = 'Ce numéro de téléphone existe déjà !';
        } else {
          this.errorMessage =
            "Erreur lors de l'inscription, veuillez rééssayer ultérieurement.";
        }
      }
    });
  }
}
