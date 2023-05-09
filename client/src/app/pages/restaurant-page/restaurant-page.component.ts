import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  PopupUpdateRestaurantComponent
} from "../../components/popup-update-restaurant/popup-update-restaurant.component";

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.scss', '../../../styles.scss']
})
export class RestaurantPageComponent {
  constructor(private modalService: NgbModal) {}

  openPopupToUpdate() {
    this.modalService.open(PopupUpdateRestaurantComponent);
  }
}
