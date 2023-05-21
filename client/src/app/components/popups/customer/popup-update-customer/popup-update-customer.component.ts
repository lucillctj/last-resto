import { Component, Input } from '@angular/core';
import {Customer} from "../../../../interfaces/customer-interface";
import {CustomerService} from "../../../../services/api/customer.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-popup-update-customer',
  templateUrl: './popup-update-customer.component.html',
  styleUrls: ['./popup-update-customer.component.scss', '../../../../../styles.scss']
})
export class PopupUpdateCustomerComponent{
  @Input() currentUser!: Customer;

  submitted = false;
  updatedUser: Customer;
  successMessage: string | null;
  errorMessageEmail: string | null;
  errorMessagePhone: string | null;
  errorMessage: string | null;

  constructor(
    private customerService: CustomerService,
    private router: Router) {
    this.updatedUser = {} as Customer;
    this.currentUser = {} as Customer;

    this.successMessage = null;
    this.errorMessageEmail = null;
    this.errorMessagePhone = null;
    this.errorMessage = null;
  }

  onSubmit() {
    this.submitted = true;
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
              this.errorMessage = 'Erreur lors de la mise à jour, veuillez rééssayer ultérieurement.';
            }
          }
        )
    }
    else if (!this.updatedUser) {
      this.customerService.updateCustomer(this.currentUser)
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
