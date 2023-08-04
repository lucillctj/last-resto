import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import {Customer} from "../../../interfaces/customer-interface";
import {
  RedirectToCreateAccountOrLoginComponent
} from "../../popups/user/redirect-to-create-account/redirect-to-create-account-or-login.component";

@Component({
  selector: 'app-nav-bar-customer',
  templateUrl: './nav-bar-customer.component.html',
  styleUrls: ['./nav-bar-customer.component.scss', '../../../../styles.scss']
})
export class NavBarCustomerComponent implements OnInit{
  currentCustomer: Customer;
  isSearchActive: boolean;
  isDashboardActive: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    this.currentCustomer = {} as Customer;
    this.isSearchActive = false;
    this.isDashboardActive = false;
  }

  ngOnInit(){
    if (this.router.url.includes('/api/v1/restaurants')) {
      this.isSearchActive = true;
    }
    else if (this.router.url.includes('/api/v1/customers/dashboard')) {
      this.isDashboardActive = true;
    }
  }

  redirectToRestaurantSearch() {
    const redirectUrl = `/api/v1/restaurants`;
    if (this.router.url === redirectUrl) {
      this.isSearchActive = true;
    } else {
      this.isSearchActive = false;
      this.router.navigate([redirectUrl]);
    }
  }

  redirectToCustomerDashboard() {
    this.authService.getCurrentUser().subscribe(currentUser => {
      this.currentCustomer = currentUser as Customer;
    });

    if (this.router.url.includes(`/api/v1/customers/dashboard/`)) {
      this.isSearchActive = true;

    } else if (this.currentCustomer) {
      const urlCustomerDashboard = `/api/v1/customers/dashboard/${this.currentCustomer.user_id}`;

      this.isSearchActive = false;
      this.router.navigate([urlCustomerDashboard]);
    }
    else {
      this.modalService.open(RedirectToCreateAccountOrLoginComponent)
    }
  }

}
