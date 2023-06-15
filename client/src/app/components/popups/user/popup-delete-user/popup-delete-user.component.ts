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
      try{
        const restaurants = await this.restaurantService.getRestaurantByUserId(this.currentUser.user_id as number).toPromise();
        console.log(restaurants)
        if (restaurants!.length >= 1) {
          for (const restaurant of restaurants!) {
            await this.restaurantService.deleteRestaurant(restaurant).toPromise();
            console.log('restaurant correctement supprimé !');
          }
        }
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données du restaurant :', error);
      }
    }

    this.userService.deleteUser(this.currentUser)
      .subscribe(() => {
          this.successMessage = 'Votre compte a bien été supprimé !';
          this.authService.setCurrentUser(null);
          this.modalService.dismissAll()
          this.router.navigate(['/api/v1']);
        },
        _ => {
          this.errorMessage = 'Erreur lors de la suppression, veuillez réessayer ultérieurement.';
        })
  }

  redirectToDashboard(){
    this.modalService.dismissAll()
  }
}
