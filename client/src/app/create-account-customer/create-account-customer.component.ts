import { Component } from '@angular/core';
import {CustomerService} from "../service/customer-service";
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

  createAccountCustomer(user: Customer){
    this.customerService.createCustomer(user)
      .subscribe(() => {
          this.successMessage = 'Votre compte a bien été créé !';
          console.log('Utilisateur créé avec succès :', user);
          // envoyer sur la page du profil
        },
        error => {
          console.error('Erreur lors de la création du client :', error);
          console.log(`------> SQL message :`, error.sqlMessage)
          if (error.status === 400){
            this.errorMessage = 'Certains champs sont manquants ou incorrects !';
          }
          else if (error.sqlMessage === `Duplicate entry '${user.email}' for key 'users.email'`) {
            this.errorMessage = 'Cet email existe déjà !';
          }
          else if (error.sqlMessage === `Duplicate entry '${user.phone}' for key 'users.phone'`) {
            this.errorMessage = 'Ce numéro de téléphone existe déjà !';
          }
          else{
            this.errorMessage = 'Erreur lors de l\'inscription, veuillez rééssayer ultérieurement.';
          }
        }
      )
  }

}
