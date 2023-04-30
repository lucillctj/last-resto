import { Component } from '@angular/core';
import {Customer} from "../../interfaces/customer-interface";
import {CustomerService} from "../../services/api/customer.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-popup-update-customer',
  templateUrl: './popup-update-customer.component.html',
  styleUrls: ['./popup-update-customer.component.css']
})
export class PopupUpdateCustomerComponent {

  // currentUser: Customer;
  updatedUser: Customer;
  successMessage: string | null;
  errorMessage: string| null;

  constructor(
    private customerService: CustomerService,
    private router: Router) {
    this.updatedUser = {} as Customer;
    this.successMessage = null;
    this.errorMessage = null;
  }

  updateAccountCustomer(updatedUser: Customer){
    this.customerService.updateCustomer(updatedUser)
      .subscribe(() => {
          this.successMessage = 'Vos informations ont bien été mises à jour !';
          this.router.navigate(['/customer-profil']);
        },
        error => {
          if (error.status === 400 && error.error === "Cet email existe déjà !") {
            this.errorMessage = 'Cet email existe déjà !';
          }
          else if (error.status === 400 && error.error === "Ce numéro de téléphone existe déjà !") {
            this.errorMessage = 'Ce numéro de téléphone existe déjà !';
          }
          else if (error.status === 400){
            this.errorMessage = 'Certains champs sont manquants ou incorrects !';
          }
          else{
            this.errorMessage = 'Erreur lors de l\'inscription, veuillez rééssayer ultérieurement.';
          }
        }
      )
  }
}
