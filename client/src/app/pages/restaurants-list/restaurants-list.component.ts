import {Component, OnInit} from '@angular/core';
import {RestaurantService} from "../../services/api/restaurant.service";
import {Restaurant} from "../../interfaces/restaurant-interface";
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
  PopupDetailRestaurantComponent
} from "../../components/popups/restaurant/popup-detail-restaurant/popup-detail-restaurant.component";

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss', '../../../styles.scss']
})
export class RestaurantsListComponent implements OnInit{
  currentRestaurants: Restaurant[];
  currentRestaurant: Restaurant;


  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private modalService: NgbModal

  ) {
    this.currentRestaurants = [];
    this.currentRestaurant = {} as Restaurant

  }

  ngOnInit(){
    this.restaurantService.getAllRestaurants()
      .subscribe((data) => {
          console.log(data)
            this.currentRestaurants = data.results;
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération des données du restaurant :', error);
        })
  }


  openPopupDetailRestaurant(currentRestaurant: Restaurant){
    console.log('current resto: ', currentRestaurant)
    const modalRef = this.modalService.open(PopupDetailRestaurantComponent);
    modalRef.componentInstance.currentRestaurant = currentRestaurant;
  }
}
