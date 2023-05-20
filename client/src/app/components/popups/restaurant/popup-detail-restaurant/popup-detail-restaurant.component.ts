import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Restaurant} from "../../../../interfaces/restaurant-interface";
import {RestaurantService} from "../../../../services/api/restaurant.service";

@Component({
  selector: 'app-popup-detail-restaurant',
  templateUrl: './popup-detail-restaurant.component.html',
  styleUrls: ['./popup-detail-restaurant.component.scss', '../../../../../styles.scss']
})
export class PopupDetailRestaurantComponent implements OnInit {
  @Input() currentRestaurant!: Restaurant;

  submitted = false;
  successMessage: string | null;
  errorMessage: string | null;

  constructor(
    private router: Router,
    private restaurantService: RestaurantService

  ) {
    this.successMessage = null;
    this.errorMessage = null;
  }

  ngOnInit() {
    console.log('currentResto: ', this.currentRestaurant)
    console.log('currentResto id: ', this.currentRestaurant.restaurant_id)

    this.restaurantService.getRestaurantDashboard(this.currentRestaurant.restaurant_id!)
      .subscribe(
        (data) => {
          console.log('data', data)
          this.currentRestaurant = data[0];
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération des données du restaurant.', error);
        })
  }

  clickToBook(){

  }

}
