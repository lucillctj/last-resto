import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';

import {
  PopupUpdateRestaurantComponent
} from "../../components/popups/restaurant/popup-update-restaurant/popup-update-restaurant.component";
import {Restaurant} from "../../interfaces/restaurant-interface";
import {RestaurantService} from "../../services/api/restaurant.service";
import {
  PopupDeleteRestaurantComponent
} from "../../components/popups/restaurant/popup-delete-restaurant/popup-delete-restaurant.component";
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
  isAvailable: boolean;
  newAvailability: boolean | undefined;
  successMessage: string | null;
  errorMessage: string | null;
  currentUserId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private restaurantService: RestaurantService,
    private productService: ProductService
  ) {
    this.currentRestaurant = {} as Restaurant;
    this.currentProducts = [];
    this.isAvailable = true || false;
    this.newAvailability = undefined;
    this.successMessage = null;
    this.errorMessage = null;
    this.currentUserId = parseInt(this.route.snapshot.paramMap.get("user")!);
  }

  ngOnInit() {
    const currentRestaurantId = parseInt(this.route.snapshot.paramMap.get("id")!);

    if (currentRestaurantId) {
      this.restaurantService.getRestaurantDashboard(currentRestaurantId, this.currentUserId)
        .subscribe(
          (data) => {
            this.currentRestaurant = data;
            this.isAvailable = data.is_available.data[0];
          },
          (error) => {
            console.error('Une erreur s\'est produite lors de la récupération des données du restaurant.', error);
            this.router.navigate(['api/v1']);
          })
    } else {
      console.error('L\'ID du restaurant n\'est pas un nombre valide.');
      this.router.navigate(['api/v1']);
    }

    this.productService.getProductsByRestaurantId(currentRestaurantId, this.currentUserId)
      .subscribe(
        (data) => {
          this.currentProducts = data;
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération des formules du restaurant.', error);
        })
  }


  openPopupToUpdate() {
    const modalRef = this.modalService.open(PopupUpdateRestaurantComponent);
    modalRef.componentInstance.currentRestaurant = this.currentRestaurant;
    modalRef.componentInstance.currentUserId = this.currentUserId;
  }

  openPopupToDelete() {
    const modalRef = this.modalService.open(PopupDeleteRestaurantComponent);
    modalRef.componentInstance.currentRestaurant = this.currentRestaurant;
    modalRef.componentInstance.currentProducts = this.currentProducts;
  }

  updateAvailability() {
    this.restaurantService.updateAvailability(this.currentRestaurant, this.isAvailable)
      .subscribe(
        () => {
          this.successMessage = 'La disponibilité du restaurant a bien été prise en compte !'},
        (error) => {
          this.errorMessage = 'Une erreur est survenue !';
        console.error('Une erreur s\'est produite lors de la récupération des données du restaurant.', error);
        })
  }

  openPopupToCreateProduct(){
    const modalRef = this.modalService.open(PopupCreateProductComponent);
    modalRef.componentInstance.currentRestaurant = this.currentRestaurant;
    modalRef.componentInstance.currentUserId = this.currentUserId;
  }

  deleteProduct(currentProduct: Product){
    this.productService.deleteProduct(currentProduct, this.currentUserId)
      .subscribe(() => {
          console.log('produit supprimé', currentProduct.name)
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la suppression du produit.', error);
        })
    this.ngOnInit();
  }

}
