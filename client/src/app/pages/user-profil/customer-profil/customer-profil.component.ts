import { Component} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {PopupUpdateCustomerComponent} from "../../../components/popup-update-customer/popup-update-customer.component";

@Component({
  selector: 'app-customer-profil',
  templateUrl: './customer-profil.component.html',
  styleUrls: ['./customer-profil.component.scss', '../../../../styles.scss']
})
export class CustomerProfilComponent {
  constructor(private modalService: NgbModal) {}

  openPopupToUpdate() {
    this.modalService.open(PopupUpdateCustomerComponent);
  }

  // openPopupToUpdate() {
  //   this.updateCustomerEvent.emit();
  //
  //
  // }
}
