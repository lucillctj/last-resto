import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../../styles.css']
})
export class HomeComponent {
  constructor(private router: Router) { }
  showFormToCreateAccountCustomer(){
    this.router.navigate(['/sign-up-customer']);
  }

  showFormToCreateAccountRestaurant(){
    this.router.navigate(['/sign-up-restaurant']);
  }

}
