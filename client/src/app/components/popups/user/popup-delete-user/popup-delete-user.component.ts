import {Component, Input} from '@angular/core';
import {UserService} from "../../../../services/api/user.service";
import {Router} from '@angular/router';
import {User} from "../../../../interfaces/user-interface";
import {AuthService} from "../../../../services/auth.service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RestaurantOwnerService} from "../../../../services/api/restaurant-owner.service";
import {RestaurantService} from "../../../../services/api/restaurant.service";


@Component({
  selector: 'app-popup-delete-user',
  templateUrl: './popup-delete-user.component.html',
  styleUrls: ['./popup-delete-user.component.scss', '../../../../../styles.scss']
})
export class PopupDeleteUserComponent {
  @Input() currentUser!: User;

  successMessage: string | null;
  errorMessage: string | null;

  constructor(
    private userService: UserService,
    private restaurantOwnerService: RestaurantOwnerService,
    private restaurantService: RestaurantService,
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal
  )
  {
    this.currentUser = {} as User;
    this.successMessage = null;
    this.errorMessage = null;
  }

  async confirmToDelete() {
    if (this.currentUser.role === "restaurant owner") {
      this.restaurantService.getRestaurantByUserId(this.currentUser.user_id as number)
        .subscribe({
            next: (restaurants) => {
              if(restaurants.length >= 1) {
                this.errorMessage = 'Veuillez supprimer votre restaurant, avant de réessayer.';
              }
            },
            error: () => this.errorMessage = 'Erreur lors de la récupération des données.'
          }
        );
    }
    else {
      this.userService.deleteUser(this.currentUser)
        .subscribe({
          next: () => {
            this.successMessage = 'Votre compte a bien été supprimé !';
            this.authService.setCurrentUser(null);
            this.modalService.dismissAll()
            this.router.navigate(['']);
          },
          error: () => this.errorMessage = 'Erreur lors de la suppression, veuillez réessayer ultérieurement.'
        })
    }
  }

  closePopup(){
    this.modalService.dismissAll()
  }
}
