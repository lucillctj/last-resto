import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  PopupUpdateRestaurantComponent
} from "../../components/popup-update-restaurant/popup-update-restaurant.component";

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.scss', '../../../styles.scss']
})
export class RestaurantDashboardComponent {
  constructor(private modalService: NgbModal) {}

  openPopupToUpdate() {
    this.modalService.open(PopupUpdateRestaurantComponent);
  }
}
