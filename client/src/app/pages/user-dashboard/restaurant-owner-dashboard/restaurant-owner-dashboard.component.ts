import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from "../../../services/api/customer.service";
import {AuthService} from "../../../services/auth.service";
import {
  PopupUpdateRestaurantOwnerComponent
} from "../../../components/popups/restaurant-owner/popup-update-restaurant-owner/popup-update-restaurant-owner.component";
import {RestaurantService} from "../../../services/api/restaurant.service";
import {Restaurant} from "../../../interfaces/restaurant-interface";
import {
  PopupCreateRestaurantComponent
} from "../../../components/popups/restaurant/popup-create-restaurant/popup-create-restaurant.component";
import {RestaurantOwnerService} from "../../../services/api/restaurant-owner.service";
import {RestaurantOwner} from "../../../interfaces/restaurantOwner-interface";
import {PopupDeleteUserComponent} from "../../../components/popups/user/popup-delete-user/popup-delete-user.component";
import {UserService} from "../../../services/api/user.service";

@Component({
  selector: 'app-restaurant-owner-dashboard',
  templateUrl: './restaurant-owner-dashboard.component.html',
  styleUrls: ['./restaurant-owner-dashboard.component.scss', '../../../../styles.scss']
})
export class RestaurantOwnerDashboardComponent implements OnInit {
  currentUser: RestaurantOwner;
  currentRestaurant: Restaurant;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private customerService: CustomerService,
    private restaurantOwnerService: RestaurantOwnerService,
    private restaurantService: RestaurantService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    this.currentUser = {} as RestaurantOwner;
    this.currentRestaurant = {} as Restaurant;
  }

  ngOnInit(){
    const currentUserId = parseInt(this.route.snapshot.paramMap.get("user")!);
    if (currentUserId) {
      this.restaurantOwnerService.getRestaurantOwnerDashboard(currentUserId)
        .subscribe((data) => {
            this.currentUser = data;
            this.authService.setCurrentUser(this.currentUser);

            this.restaurantService.getRestaurantByUserId(currentUserId)
              .subscribe((data) => {
                  if(data.length >= 1) {
                    this.currentRestaurant = data[0];
                  }
                },
                (error) => {
                  console.error('Une erreur s\'est produite lors de la récupération des données du restaurant :', error);
                })
          },
          (error) => {
            console.error('Une erreur s\'est produite lors de la récupération des données de l\'utilisateur.', error);
            this.authService.forgetUser();
            this.authService.setCurrentUser(null);
            this.userService.logout()
              .subscribe(() => {
                  this.router.navigate(['']);
                },
                error => {
                  console.log('error', error)
                }
              )
          });

    } else {
      console.error('L\'ID du client n\'est pas un nombre valide.');
      this.router.navigate(['']);
    }
  }

  openPopupToUpdate() {
    const modalRef = this.modalService.open(PopupUpdateRestaurantOwnerComponent);
    modalRef.componentInstance.currentUser = this.currentUser;

  }

  openPopupToDelete() {
    const modalRef = this.modalService.open(PopupDeleteUserComponent);
    modalRef.componentInstance.currentUser = this.currentUser;
    modalRef.componentInstance.currentRestaurant = this.currentRestaurant;

  }

  showRestaurantPage(restaurantId: number | undefined) {
    this.router.navigate([`/restaurants/dashboard/${restaurantId}/user/${this.currentUser.user_id}`]);
  }

  openPopupToCreateRestaurant(){
    const modalRef = this.modalService.open(PopupCreateRestaurantComponent);
    modalRef.componentInstance.currentUser = this.currentUser;
  }
}
