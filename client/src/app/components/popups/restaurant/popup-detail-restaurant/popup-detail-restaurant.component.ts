import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Restaurant} from "../../../../interfaces/restaurant-interface";
import {RestaurantService} from "../../../../services/api/restaurant.service";
import {Product} from "../../../../interfaces/product-interface";
import {ProductService} from "../../../../services/api/product.service";
import {AuthService} from "../../../../services/auth.service";
import {CustomerService} from "../../../../services/api/customer.service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Customer} from "../../../../interfaces/customer-interface";

@Component({
  selector: 'app-popup-detail-restaurant',
  templateUrl: './popup-detail-restaurant.component.html',
  styleUrls: ['./popup-detail-restaurant.component.scss', '../../../../../styles.scss']
})
export class PopupDetailRestaurantComponent implements OnInit {
  @Input() currentRestaurant!: Restaurant;
  selectedProduct: Product | undefined;

  submitted = false;
  successMessage: string | null;
  errorMessage: string | null;
  currentProducts: Product[];

  constructor(
    private router: Router,
    private restaurantService: RestaurantService,
    private productService: ProductService,
    private authService: AuthService,
    private customerService: CustomerService,
    private modalService: NgbModal
  ) {
    this.selectedProduct = undefined;
    this.successMessage = null;
    this.errorMessage = null;
    this.currentProducts = [];
  }

  ngOnInit() {
    const currentRestaurantId = this.currentRestaurant.restaurant_id;
    this.restaurantService.getRestaurantDashboard(currentRestaurantId!)
      .subscribe(
        (data) => {
          this.currentRestaurant = data[0];

          this.productService.getProductsByRestaurantId(currentRestaurantId!)
            .subscribe(
              (data) => {
                this.currentProducts = data
              },
              (error) => {
                console.error('Une erreur s\'est produite lors de la récupération des données des formules.', error);
              })
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération des données du restaurant.', error);
        })
  }

  clickToBook() {
    console.log(this.selectedProduct)
    if (this.selectedProduct) {
      const currentUser: Customer = this.authService.getCurrentUser();
      this.customerService.bookProduct(currentUser, this.selectedProduct)
        .subscribe(() => {
            this.successMessage = 'Votre réservation a bien été prise en compte !'
            setTimeout(() => {
              this.router.navigate(['/api/v1/restaurants']);
              this.modalService.dismissAll()
            }, 2000)
          },
          error => {
            console.log('Erreur lors de la réservation :', error);
            this.errorMessage = 'Une erreur est survenue lors votre réservation, veuillez réessayer.';

          })
    }
  }
}
