import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../../services/api/customer.service';
import { Customer } from '../../interfaces/customer-interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-account-customer',
  templateUrl: './create-account-customer.component.html',
  styleUrls: [
    './create-account-customer.component.scss',
    '../../../styles.scss'
  ]
})
export class CreateAccountCustomerComponent {
  submitted = false;
  newUser: Customer;
  errorMessageEmail: string | null;
  errorMessagePhone: string | null;
  errorMessage: string | null;
  isPrivacyPolicyAccepted: boolean = false;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private authService: AuthService
  ) {
    this.newUser = {} as Customer;
    this.errorMessageEmail = null;
    this.errorMessagePhone = null;
    this.errorMessage = null;
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (!form.valid || this.isPrivacyPolicyAccepted === false) {
      return;
    }

    this.customerService.createCustomer(this.newUser).subscribe({
      next: (res) => {
        this.authService.setCurrentUser(this.newUser);
        this.router.navigate([`/customers/dashboard/${res.userId}`]);
      },
      error: (error) => {
        if (error.status === 400 && error.error === 'Cet email existe déjà !') {
          this.errorMessageEmail = 'Cet email existe déjà !';
        } else if (
          error.status === 400 &&
          error.error === 'Ce numéro de téléphone existe déjà !'
        ) {
          this.errorMessagePhone = 'Ce numéro de téléphone existe déjà !';
        } else {
          this.errorMessage =
            "Erreur lors de l'inscription, veuillez rééssayer ultérieurement.";
        }
      }
    });
  }
}
