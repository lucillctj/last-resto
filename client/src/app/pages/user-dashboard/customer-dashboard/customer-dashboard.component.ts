import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import {PopupUpdateCustomerComponent} from "../../../components/popup-update-customer/popup-update-customer.component";
// import {AuthService} from "../../../services/auth.service";
import {Customer} from "../../../interfaces/customer-interface";
import {CustomerService} from "../../../services/api/customer.service";
import {UserService} from "../../../services/api/user.service";
import {User} from "../../../interfaces/user-interface";

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss', '../../../../styles.scss']
})
export class CustomerDashboardComponent implements OnInit {
  // user: User;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private customerService: CustomerService,
              // private authService: AuthService,
              private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.user.userId = params['id'];
// // Maintenant, vous pouvez utiliser l'ID pour récupérer les informations de l'utilisateur
//       this.userService.login(this.user).subscribe(user => {
//         this.user.userId = user.userId; // Supposons que le nom de l'utilisateur soit stocké dans la propriété 'name'
//       });
//     });
  }
}



// const userId = this.authService.getCurrentUserId();
// if (userId) {
//   this.customerService.getCustomerById(userId).subscribe(
//     (customer) => {
//       this.user = customer;
//       console.log(this.user);
//     },
//     (error) => {
//       console.log('Erreur lors de la récupération des informations de l\'utilisateur :', error);
//     }
//   );
// }




//
// openPopupToUpdate() {
//   this.modalService.open(PopupUpdateCustomerComponent);
// }

// openPopupToUpdate() {
//   this.updateCustomerEvent.emit();
//
//
// }

