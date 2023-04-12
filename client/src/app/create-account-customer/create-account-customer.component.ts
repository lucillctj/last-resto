import { Component } from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {Customer} from "../interfaces/customer-interface";

@Component({
  selector: 'app-create-account-customer',
  templateUrl: './create-account-customer.component.html',
  styleUrls: ['./create-account-customer.component.css', '../../styles.css']
})
export class CreateAccountCustomerComponent {
  newUser: Customer;
  successMessage: string | null;
  errorMessage: string| null;
  constructor(private customerService: CustomerService) {
    this.newUser = {} as Customer;
    this.successMessage = null;
    this.errorMessage = null;
  }

  createAccountCustomer(newUser: Customer){
    this.customerService.createCustomer(newUser)
      .subscribe((response) => {
          this.successMessage = 'Votre compte a bien été créé !';
          // envoyer sur la page du profil
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
