import { Component } from '@angular/core';
import {Customer} from "../../../interfaces/customer-interface";
import {CustomerService} from "../../../services/api/customer.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss', '../../../../styles.scss']
})
export class LogInComponent {
  user: Customer;
  errorMessage: string| null;
  constructor(
    private customerService: CustomerService,
    private router: Router) {
    this.user = {} as Customer;
    this.errorMessage = null;
  }

  loginAccount(user: Customer){
    this.customerService.login(user)
      .subscribe(() => {
        //si user = customer, si user = restaurant owner....
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
