import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CustomerService} from "../../../services/api/customer.service";
import {AuthService} from "../../../services/auth.service";
import {PopupUpdateRestaurantOwnerComponent} from "../../../components/popup-update-restaurant-owner/popup-update-restaurant-owner.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-owner-profil',
  templateUrl: './restaurant-owner-profil.component.html',
  styleUrls: ['./restaurant-owner-profil.component.scss', '../../../../styles.scss']
})
export class RestaurantOwnerProfilComponent {
  constructor(
    private router: Router,
    private customerService: CustomerService,
    private authService: AuthService,
    private modalService: NgbModal)
  {}

  openPopupToUpdate() {
    this.modalService.open(PopupUpdateRestaurantOwnerComponent);
  }
  showRestaurantPage() {
    this.router.navigate(['/restaurant-page']);
  }
}
