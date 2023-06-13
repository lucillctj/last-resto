import {Component, Input, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {RestaurantOwner} from "../../../../interfaces/restaurantOwner-interface";
import {RestaurantService} from "../../../../services/api/restaurant.service";
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Restaurant} from "../../../../interfaces/restaurant-interface";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-popup-create-restaurant',
  templateUrl: './popup-create-restaurant.component.html',
  styleUrls: ['./popup-create-restaurant.component.scss', '../../../../../styles.scss']
})
export class PopupCreateRestaurantComponent {
  @Input() currentUser!: RestaurantOwner;
  @ViewChild('form', { static: false })

  form!: NgForm;
  submitted = false;
  newRestaurant: Restaurant;
  successMessage: string | null;
  errorMessage: string| null;

  constructor(
    private restaurantService: RestaurantService,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal

  ) {
    this.newRestaurant = {} as Restaurant;
    this.successMessage = null;
    this.errorMessage = null;
  }


  onSubmit() {
    this.submitted = true;
    if(!this.form.form.valid){
      return
    }

    this.newRestaurant.restaurant_owner_id = this.currentUser.user_id;
    this.restaurantService.createRestaurant(this.newRestaurant)
      .subscribe(() => {
          this.successMessage = 'Votre restaurant a bien été créé !';
          setTimeout(() => {
            this.router.navigate([`/api/v1/restaurant-owners/dashboard/${this.newRestaurant.restaurant_owner_id}`]);
            location.reload();
            this.modalService.dismissAll()
          }, 2000)
        },
        error => {
          this.errorMessage = 'Erreur lors de la création du restaurant, veuillez réessayer ultérieurement.';
        }
      );
  }

  redirectToDashboard(){
    this.modalService.dismissAll()
  }

}






