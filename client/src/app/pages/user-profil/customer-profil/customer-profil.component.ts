import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {PopupUpdateCustomerComponent} from "../../../components/popup-update-customer/popup-update-customer.component";
import {AuthService} from "../../../services/auth.service";
import {Customer} from "../../../interfaces/customer-interface";
import {CustomerService} from "../../../services/api/customer.service";

@Component({
  selector: 'app-customer-profil',
  templateUrl: './customer-profil.component.html',
  styleUrls: ['./customer-profil.component.scss', '../../../../styles.scss']
})
export class CustomerProfilComponent implements OnInit {
  user: Customer | undefined;

  constructor(private customerService: CustomerService, private authService: AuthService, private modalService: NgbModal) {}

  ngOnInit() {
    // const userId = this.authService.getCurrentUserId();
    // if (userId) {
    //   this.customerService.getCustomerById(userId).subscribe(
    //     (customer) => {
    //       this.user = customer;
    //       console.log(this.user);
    //       // Faites quelque chose avec les informations de l'utilisateur
    //     },
    //     (error) => {
    //       console.log('Erreur lors de la récupération des informations de l\'utilisateur :', error);
    //     }
    //   );
    // }
  }




openPopupToUpdate() {
  this.modalService.open(PopupUpdateCustomerComponent);
}

// openPopupToUpdate() {
//   this.updateCustomerEvent.emit();
//
//
// }
}
