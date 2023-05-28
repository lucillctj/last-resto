import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../styles.scss']
})
export class HomeComponent {
  constructor(private router: Router) {
  }

  showFormToCreateAccountCustomer(){
    this.router.navigate(['/api/v1/customers/signup']);
  }

  showFormToCreateAccountRestaurant(){
    this.router.navigate(['api/v1/restaurant-owners/signup']);
  }
}
