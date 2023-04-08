import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-restaurant',
  templateUrl: './sign-up-restaurant.component.html',
  styleUrls: ['./sign-up-restaurant.component.css', '../../../styles.css']
})
export class SignUpRestaurantComponent {
  constructor(private router: Router) { }
  returnToHomePage(){
    this.router.navigate(['/']);
  }

}
