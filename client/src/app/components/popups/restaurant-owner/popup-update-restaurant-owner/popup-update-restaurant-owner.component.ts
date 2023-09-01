import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantOwner } from '../../../../interfaces/restaurantOwner-interface';
import { RestaurantOwnerService } from '../../../../services/api/restaurant-owner.service';
import { Restaurant } from '../../../../interfaces/restaurant-interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-popup-update-customer',
  templateUrl: './popup-update-restaurant-owner.component.html',
  styleUrls: [
    './popup-update-restaurant-owner.component.scss',
    '../../../../../styles.scss'
  ]
})
export class PopupUpdateRestaurantOwnerComponent implements OnInit {
  @Input() currentRestaurant!: Restaurant;
  @Input() currentRestaurantOwner!: RestaurantOwner;

  submitted = false;
  updatedUser: RestaurantOwner;
  successMessage: string | null;
  errorMessageEmail: string | null;
  errorMessagePhone: string | null;
  errorMessage: string | null;
  passwordModified: boolean;
  newPassword: string;

  constructor(
    private authService: AuthService,
    private restaurantOwnerService: RestaurantOwnerService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.updatedUser = {} as RestaurantOwner;
    this.currentRestaurantOwner = {} as RestaurantOwner;
    this.successMessage = null;
    this.errorMessageEmail = null;
    this.errorMessagePhone = null;
    this.errorMessage = null;
    this.passwordModified = false;
    this.newPassword = '';
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((currentUser) => {
      this.currentRestaurantOwner = currentUser as RestaurantOwner;
    });

    this.updatedUser.first_name = this.currentRestaurantOwner.first_name;
    this.updatedUser.last_name = this.currentRestaurantOwner.last_name;
    this.updatedUser.email = this.currentRestaurantOwner.email;
    this.updatedUser.phone = this.currentRestaurantOwner.phone;
  }

  onSubmit() {
    this.submitted = true;
    if (this.newPassword != '') {
      this.updatedUser.password = this.newPassword;
    }

    if (
      this.updatedUser.first_name &&
      this.updatedUser.last_name &&
      this.updatedUser.email &&
      this.updatedUser.phone
    ) {
      this.restaurantOwnerService
        .updateRestaurantOwner(this.updatedUser, this.currentRestaurantOwner)
        .subscribe(
          () => {
            this.successMessage =
              'Vos informations ont bien été mises à jour !';
            setTimeout(() => {
              location.reload();
              this.modalService.dismissAll();
            }, 2000);
          },
          (error) => {
            if (
              error.status === 400 &&
              error.error === 'Cet email existe déjà !'
            ) {
              this.errorMessageEmail = 'Cet email existe déjà !';
            } else if (
              error.status === 400 &&
              error.error === 'Ce numéro de téléphone existe déjà !'
            ) {
              this.errorMessagePhone = 'Ce numéro de téléphone existe déjà !';
            } else if (
              error.status === 400 &&
              error.error === 'Certains champs sont manquants ou incorrects.'
            ) {
              this.errorMessage =
                'Certains champs sont manquants ou incorrects.';
            } else {
              this.errorMessage =
                'Erreur lors de la mise à jour, veuillez rééssayer ultérieurement.';
            }
          }
        );
    } else {
      this.errorMessage = 'Certains champs sont manquants ou incorrects.';
    }
  }

  closePopup() {
    this.modalService.dismissAll();
  }
}
