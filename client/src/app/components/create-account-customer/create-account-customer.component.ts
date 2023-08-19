import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {CustomerService} from "../../services/api/customer.service";
import {Customer} from "../../interfaces/customer-interface";
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-create-account-customer',
  templateUrl: './create-account-customer.component.html',
  styleUrls: ['./create-account-customer.component.scss', '../../../styles.scss']
})
export class CreateAccountCustomerComponent {
  @ViewChild('form', { static: false })

  form!: NgForm;
  submitted = false;
  newUser: Customer;
  errorMessageEmail: string | null;
  errorMessagePhone: string | null;
  errorMessage: string| null;

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

  // ngOnInit() {
  //   // this.reactiveForm = this.formBuilder.group({
  //   //   first_name: [null, [Validators.required]],
  //   //   last_name: [null, [Validators.required]],
  //   //   email: [null, [Validators.required]],
  //   //   phone: [null, [Validators.required]],
  //   //   password: [null, [Validators.required, Validators.minLength(6)]],
  //   //   address: [null, [Validators.required]],
  //   //   post_code: [null, [Validators.required]],
  //   //   city: [null, [Validators.required]],
  //   // });
  // }

  onSubmit() {
    this.submitted = true;
    if(!this.form.form.valid){
      return
    }

    this.customerService.createCustomer(this.newUser)
      .subscribe((res) => {
          this.authService.setCurrentUser(this.newUser);
          this.router.navigate([`/customers/dashboard/${res.userId}`]);
        },
        error => {
          if (error.status === 400 && error.error === "Cet email existe déjà !") {
            this.errorMessageEmail = 'Cet email existe déjà !';
          }
          else if (error.status === 400 && error.error === "Ce numéro de téléphone existe déjà !") {
            this.errorMessagePhone = 'Ce numéro de téléphone existe déjà !';
          }
          else{
            this.errorMessage = 'Erreur lors de l\'inscription, veuillez rééssayer ultérieurement.';
          }
        }
      )
  }
}





//     createAccountCustomer(newUser: Customer){
//     this.customerService.createCustomer(newUser)
//       .subscribe(() => {
//           this.successMessage = 'Votre compte a bien été créé !';
//           this.router.navigate(['/customers/dashboard/:id']);
//         },
//         error => {
//           if (error.status === 400 && error.error === "Cet email existe déjà !") {
//             this.errorMessage = 'Cet email existe déjà !';
//           }
//           else if (error.status === 400 && error.error === "Ce numéro de téléphone existe déjà !") {
//             this.errorMessage = 'Ce numéro de téléphone existe déjà !';
//           }
//           else if (error.status === 400){
//             this.errorMessage = 'Certains champs sont manquants ou incorrects !';
//           }
//           else{
//             this.errorMessage = 'Erreur lors de l\'inscription, veuillez rééssayer ultérieurement.';
//           }
//         }
//       )
//   }
// }
