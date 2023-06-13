import {Component, Input, OnInit} from '@angular/core';
import {Customer} from "../../../../interfaces/customer-interface";
import {CustomerService} from "../../../../services/api/customer.service";
import {Router} from '@angular/router';
import {AuthService} from "../../../../services/auth.service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


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
  newPassword: string;

  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.updatedUser = {} as Customer;
    this.currentCustomer = {} as Customer;

    this.successMessage = null;
    this.errorMessageEmail = null;
    this.errorMessagePhone = null;
    this.errorMessage = null;
    this.passwordModified = false;
    this.newPassword = '';
  }

  ngOnInit(){
    this.authService.getCurrentUser().subscribe(currentUser => {
      this.currentCustomer = currentUser as Customer;
    });

    this.updatedUser.first_name = this.currentCustomer.first_name;
    this.updatedUser.last_name = this.currentCustomer.last_name;
    this.updatedUser.email = this.currentCustomer.email;
    this.updatedUser.phone = this.currentCustomer.phone;
    this.updatedUser.address = this.currentCustomer.address;
    this.updatedUser.post_code = this.currentCustomer.post_code;
    this.updatedUser.city = this.currentCustomer.city;
  }

  onSubmit() {
    this.submitted = true;
    if(this.newPassword != ''){
      this.updatedUser.password = this.newPassword;
    }

    if(this.updatedUser.first_name && this.updatedUser.last_name &&  this.updatedUser.email && this.updatedUser.phone && this.updatedUser.address && this.updatedUser.post_code && this.updatedUser.city) {
      this.customerService.updateCustomer(this.updatedUser, this.currentCustomer)
        .subscribe(() => {
            this.successMessage = 'Vos informations ont bien été mises à jour !';
            this.modalService.dismissAll()
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
            }
          }
        )
    }
    else {
      this.errorMessage = 'Certains champs sont manquants ou incorrects.';
    }
  }
}
