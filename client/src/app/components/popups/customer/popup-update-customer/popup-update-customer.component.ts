import { Component, OnInit, Input } from '@angular/core';
import {Customer} from "../../../../interfaces/customer-interface";
import {CustomerService} from "../../../../services/api/customer.service";
import { Router } from '@angular/router';
import {AuthService} from "../../../../services/auth.service";


@Component({
  selector: 'app-popup-update-customer',
  templateUrl: './popup-update-customer.component.html',
  styleUrls: ['./popup-update-customer.component.scss', '../../../../../styles.scss']
})
export class PopupUpdateCustomerComponent implements OnInit{
  @Input() currentCustomer!: Customer;

  submitted = false;
  updatedUser: Customer;
  successMessage: string | null;
  errorMessageEmail: string | null;
  errorMessagePhone: string | null;
  errorMessage: string | null;
  passwordModified: boolean;

  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    private router: Router) {
    this.updatedUser = {} as Customer;
    this.currentCustomer = {} as Customer;

    this.successMessage = null;
    this.errorMessageEmail = null;
    this.errorMessagePhone = null;
    this.errorMessage = null;
    this.passwordModified = false;
  }

  ngOnInit(){
    this.authService.getCurrentUser().subscribe(currentUser => {
      this.currentCustomer = currentUser as Customer;
    });

    if (this.updatedUser.password) {
      this.updatedUser.password = this.currentCustomer.password;
    } else {
      this.updatedUser.password = '';
    }

    this.updatedUser.first_name = this.currentCustomer.first_name;
    this.updatedUser.last_name = this.currentCustomer.last_name;
    this.updatedUser.email = this.currentCustomer.email;
    this.updatedUser.phone = this.currentCustomer.phone;
    this.updatedUser.address = this.currentCustomer.address;
    this.updatedUser.post_code = this.currentCustomer.post_code;
    this.updatedUser.city = this.currentCustomer.city;
  }

  onPasswordChange() {
    this.passwordModified = true;
  }

  onSubmit() {
    this.submitted = true;
    if (this.passwordModified) {
      this.updatedUser.password // Mettez ici la logique appropriée pour mettre à jour le mot de passe en base de données
    } else {
     return // Réaffectez la valeur d'origine du mot de passe
    }

    console.log('2', this.currentCustomer.last_name)

    if(this.updatedUser) {
      this.customerService.updateCustomer(this.updatedUser)
        .subscribe((res) => {
            this.successMessage = 'Vos informations ont bien été mises à jour !';
            this.router.navigate([`/api/v1/customers/dashboard/${res.userId}`]);
          },
          error => {
            if (error.status === 400 && error.error === "Cet email existe déjà !") {
              this.errorMessageEmail = 'Cet email existe déjà !';
            } else if (error.status === 400 && error.error === "Ce numéro de téléphone existe déjà !") {
              this.errorMessagePhone = 'Ce numéro de téléphone existe déjà !';
            } else if (error.status === 400 && error.error === "Certains champs sont manquants ou incorrects.") {
              this.errorMessage = 'Certains champs sont manquants ou incorrects.';
            } else {
              this.errorMessage = 'Erreur lors de la mise à jour, veuillez rééssayer ultérieurement.'
              console.log(error);
            }
          }
        )
    }
    else if (!this.updatedUser) {
      this.customerService.updateCustomer(this.currentCustomer)
        .subscribe((res) => {
            this.successMessage = 'L\'utilisateur n\'a pas été modifié.';
            this.router.navigate([`/api/v1/customers/dashboard/${res.userId}`]);
          },
          error => {
            this.errorMessage = 'Erreur, veuillez rééssayer ultérieurement.';
          })
    }
  }
}
