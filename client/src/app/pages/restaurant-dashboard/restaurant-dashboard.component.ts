import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {
  PopupUpdateRestaurantComponent
} from "../../components/popups/restaurant/popup-update-restaurant/popup-update-restaurant.component";
import {Restaurant} from "../../interfaces/restaurant-interface";
import {RestaurantService} from "../../services/api/restaurant.service";
import {
  PopupDeleteRestaurantComponent
} from "../../components/popups/restaurant/popup-delete-restaurant/popup-delete-restaurant.component";
import {AuthService} from "../../services/auth.service";
import {ProductService} from "../../services/api/product.service";
import {Product} from "../../interfaces/product-interface";
import {
  PopupCreateProductComponent
} from "../../components/popups/product/popup-create-product/popup-create-product.component";

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.scss', '../../../styles.scss']
})
export class RestaurantDashboardComponent implements OnInit {
  currentRestaurant: Restaurant;
  currentProducts: Product[];

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private restaurantService: RestaurantService,
    private productService: ProductService,
    private authService: AuthService
  ) {
    this.currentRestaurant = {} as Restaurant;
    this.currentProducts = [];


  }

  ngOnInit() {
    const currentRestaurantId = parseInt(this.route.snapshot.paramMap.get("id")!);

    if (currentRestaurantId) {
      this.restaurantService.getRestaurantDashboard(currentRestaurantId)
        .subscribe(
          (data) => {
            this.currentRestaurant = data[0];
          },
          (error) => {
            console.error('Une erreur s\'est produite lors de la récupération des données du restaurant.', error);
          })
    } else {
      console.error('L\'ID du restaurant n\'est pas un nombre valide.');
    }

    this.productService.getProductsByRestaurantId(currentRestaurantId)
      .subscribe(
        (data) => {
          console.log(data)
          this.currentProducts = data;
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération des données du restaurant.', error);
        })
  }


  openPopupToUpdate() {
    this.modalService.open(PopupUpdateRestaurantComponent);
  }

  openPopupToDelete() {
    const modalRef = this.modalService.open(PopupDeleteRestaurantComponent);
    modalRef.componentInstance.currentRestaurant = this.currentRestaurant;
  }

  openPopupToCreateProduct(){
    const modalRef = this.modalService.open(PopupCreateProductComponent);
    modalRef.componentInstance.currentRestaurant = this.currentRestaurant;
  }
}
