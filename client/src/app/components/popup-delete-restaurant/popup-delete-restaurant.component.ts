import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from "../../services/auth.service";
import {Restaurant} from "../../interfaces/restaurant-interface";
import {RestaurantService} from "../../services/api/restaurant.service";

@Component({
  selector: 'app-popup-delete-restaurant',
  templateUrl: './popup-delete-restaurant.component.html',
  styleUrls: ['./popup-delete-restaurant.component.scss', '../../../styles.scss']
})
export class PopupDeleteRestaurantComponent {
  @Input() currentRestaurant!: Restaurant;

  successMessage: string | null;
  errorMessage: string | null;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal
  )
  {
    this.currentRestaurant = {} as Restaurant;
    this.successMessage = null;
    this.errorMessage = null;
  }

  async confirmToDelete() {
    this.restaurantService.deleteRestaurant(this.currentRestaurant)
      .subscribe(() => {
          this.successMessage = 'Votre restaurant a bien été supprimé !';
          setTimeout(() => {
            this.router.navigate([`/api/v1/restaurant-owners/dashboard/${this.currentRestaurant.user_id}`]);
            this.modalService.dismissAll()
          }, 2000)
        },
        error => {
          console.log('Erreur lors de la suppression du restaurant :', error);
          this.errorMessage = 'Erreur lors de la suppression du restaurant, veuillez réessayer ultérieurement.';
        })
  }

  redirectToDashboard(){
    this.modalService.dismissAll()
  }
}
