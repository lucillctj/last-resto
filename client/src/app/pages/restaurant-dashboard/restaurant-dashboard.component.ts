import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import {
  PopupUpdateRestaurantComponent
} from "../../components/popup-update-restaurant/popup-update-restaurant.component";
import {Restaurant} from "../../interfaces/restaurant-interface";
import {RestaurantService} from "../../services/api/restaurant.service";
import {
  PopupDeleteRestaurantComponent
} from "../../components/popup-delete-restaurant/popup-delete-restaurant.component";

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.scss', '../../../styles.scss']
})
export class RestaurantDashboardComponent implements OnInit {
  currentRestaurant: Restaurant;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private restaurantService: RestaurantService
  ) {
    this.currentRestaurant = {} as Restaurant;


  }

  ngOnInit() {
    const currentRestaurantId = parseInt(this.route.snapshot.paramMap.get("id")!);
    if (currentRestaurantId) {
      this.restaurantService.getRestaurantDashboard(currentRestaurantId)
        .subscribe(
          (data) => {
            this.currentRestaurant = data[0];
            console.log(this.currentRestaurant)

          },
          (error) => {
            console.error('Une erreur s\'est produite lors de la récupération des données de l\'utilisateur.', error);
          })
    } else {
      console.error('L\'ID du client n\'est pas un nombre valide.');
    }
  }


  openPopupToUpdate() {
    this.modalService.open(PopupUpdateRestaurantComponent);
  }

  openPopupToDelete() {
    const modalRef = this.modalService.open(PopupDeleteRestaurantComponent);
    modalRef.componentInstance.currentRestaurant = this.currentRestaurant;
  }
}
