import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-restaurant-owner',
  templateUrl: './sign-up-restaurant-owner.component.html',
  styleUrls: ['./sign-up-restaurant-owner.component.scss', '../../../../styles.scss']
})
export class SignUpRestaurantOwnerComponent {
  constructor(private router: Router) { }
  returnToHomePage(){
    this.router.navigate(['/api/v1']);
  }
}
