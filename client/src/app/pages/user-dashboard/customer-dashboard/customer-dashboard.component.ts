import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {
  PopupUpdateCustomerComponent
} from "../../../components/popups/customer/popup-update-customer/popup-update-customer.component";
import {Customer} from "../../../interfaces/customer-interface";
import {CustomerService} from "../../../services/api/customer.service";
import {UserService} from "../../../services/api/user.service";
import {PopupDeleteUserComponent} from "../../../components/popups/user/popup-delete-user/popup-delete-user.component";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss', '../../../../styles.scss']
})
export class CustomerDashboardComponent implements OnInit {
  currentUser: Customer;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private customerService: CustomerService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    this.currentUser = {} as Customer;
  }

  ngOnInit() {
    const currentUserId = parseInt(this.route.snapshot.paramMap.get("id")!);
    if (currentUserId) {
      this.customerService.getCustomerDashboard(currentUserId)
        .subscribe((data) => {
          this.currentUser = data.results[0];
            this.authService.setCurrentUser(this.currentUser);
          },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération des données de l\'utilisateur.', error);
        })
    } else {
      console.error('L\'ID du client n\'est pas un nombre valide.');
    }
  }


  openPopupToUpdate() {
    const modalRef = this.modalService.open(PopupUpdateCustomerComponent);
    modalRef.componentInstance.currentUser = this.currentUser;
  }

  openPopupToDelete() {
    const modalRef = this.modalService.open(PopupDeleteUserComponent);
    modalRef.componentInstance.currentUser = this.currentUser;
  }

  redirectToRestaurantsList(){
    this.router.navigate(['api/v1/restaurants']);
  }
}

