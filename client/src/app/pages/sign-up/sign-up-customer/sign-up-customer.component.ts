import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-customer',
  templateUrl: './sign-up-customer.component.html',
  styleUrls: ['./sign-up-customer.component.scss', '../../../../styles.scss']
})
export class SignUpCustomerComponent {
  constructor(private router: Router) { }
  returnToHomePage(){
    this.router.navigate(['/']);
  }
}
