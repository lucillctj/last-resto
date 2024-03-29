import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Restaurant } from '../../../../interfaces/restaurant-interface';
import { RestaurantService } from '../../../../services/api/restaurant.service';

@Component({
  selector: 'app-popup-update-restaurant',
  templateUrl: './popup-update-restaurant.component.html',
  styleUrls: ['./popup-update-restaurant.component.scss']
})
export class PopupUpdateRestaurantComponent implements OnInit {
  @Input() currentRestaurant!: Restaurant;
  @Input() currentUserId!: number;

  submitted = false;
  updatedRestaurant: Restaurant;
  successMessage: string | null;
  errorMessage: string | null;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.updatedRestaurant = {} as Restaurant;
    this.successMessage = null;
    this.errorMessage = null;
  }

  ngOnInit() {
    this.updatedRestaurant.restaurant_id = this.currentRestaurant.restaurant_id;
    this.updatedRestaurant.user_id = this.currentUserId;
    this.updatedRestaurant.name = this.currentRestaurant.name;
    this.updatedRestaurant.description = this.currentRestaurant.description;
    this.updatedRestaurant.address = this.currentRestaurant.address;
    this.updatedRestaurant.post_code = this.currentRestaurant.post_code;
    this.updatedRestaurant.city = this.currentRestaurant.city;
    this.updatedRestaurant.phone = this.currentRestaurant.phone;
    this.updatedRestaurant.website = this.currentRestaurant.website;
  }

  onSubmit() {
    this.submitted = true;
    if (this.updatedRestaurant.website === '') {
      this.updatedRestaurant.website = null;
    }
    if (
      this.updatedRestaurant.name &&
      this.updatedRestaurant.description &&
      this.updatedRestaurant.address &&
      this.updatedRestaurant.post_code &&
      this.updatedRestaurant.city &&
      this.updatedRestaurant.phone
    ) {
      this.restaurantService
        .updateRestaurant(this.updatedRestaurant)
        .subscribe({
          next: () => {
            this.successMessage = 'Votre restaurant a bien été mis à jour !';
            setTimeout(() => {
              location.reload();
              this.modalService.dismissAll();
            }, 2000);
          },
          error: () => {
            this.errorMessage =
              'Erreur lors de la mise à jour, veuillez rééssayer ultérieurement.';
          }
        });
    } else {
      this.errorMessage = 'Certains champs sont manquants ou incorrects.';
    }
  }

  closePopup() {
    this.modalService.dismissAll();
  }
}
