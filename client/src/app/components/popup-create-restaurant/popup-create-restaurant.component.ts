import { Component, Input } from '@angular/core';
import {RestaurantOwner} from "../../interfaces/restaurantOwner-interface";
import {RestaurantService} from "../../services/api/restaurant.service";
import { Router } from '@angular/router';
import {Restaurant} from "../../interfaces/restaurant-interface";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-popup-create-restaurant',
  templateUrl: './popup-create-restaurant.component.html',
  styleUrls: ['./popup-create-restaurant.component.scss', '../../../styles.scss']
})
export class PopupCreateRestaurantComponent {
  @Input() currentUser!: RestaurantOwner;
  submitted = false;
  newRestaurant: Restaurant;
  errorMessage: string| null;

  constructor(
    private restaurantService: RestaurantService,
    private authService: AuthService,
    private router: Router
  ) {
    this.newRestaurant = {} as Restaurant;
    this.errorMessage = null;
    console.log('1', this.newRestaurant);

  }


  onSubmit(){
    this.submitted = true;
    console.log('2', this.newRestaurant);
    const currentUserId = this.authService.getCurrentUserId();
    this.newRestaurant.user_id = currentUserId!;
    this.restaurantService.createRestaurant(this.newRestaurant)
      .subscribe(() => {
          const currentUserId = this.authService.getCurrentUserId()
          this.router.navigate([`/api/v1/restaurant-owners/dashboard/${currentUserId}`]);
        },
        error => {
          this.errorMessage = 'Erreur lors de la création du restaurant, veuillez rééssayer ultérieurement.';
        }
      )


  }

}
