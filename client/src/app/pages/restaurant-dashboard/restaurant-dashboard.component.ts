import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PopupCreateProductComponent } from '../../components/popups/product/popup-create-product/popup-create-product.component';
import { PopupDeleteRestaurantComponent } from '../../components/popups/restaurant/popup-delete-restaurant/popup-delete-restaurant.component';
import { PopupUpdateRestaurantComponent } from '../../components/popups/restaurant/popup-update-restaurant/popup-update-restaurant.component';
import { Customer } from '../../interfaces/customer-interface';
import { Product } from '../../interfaces/product-interface';
import { Restaurant } from '../../interfaces/restaurant-interface';
import { CustomerService } from '../../services/api/customer.service';
import { ProductService } from '../../services/api/product.service';
import { RestaurantOwnerService } from '../../services/api/restaurant-owner.service';
import { RestaurantService } from '../../services/api/restaurant.service';
import { AuthService } from '../../services/auth.service';

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
  usersIdsHasReserved!: any;
  userHasReserved!: Customer;
  productReserved!: Product;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private restaurantService: RestaurantService,
    private productService: ProductService,
    private customerService: CustomerService,
    private authService: AuthService,
    private restaurantOwnerService: RestaurantOwnerService
  ) {
    this.currentRestaurant = {} as Restaurant;
    this.currentProducts = [];
    this.isAvailable = true || false;
    this.newAvailability = undefined;
    this.successMessage = null;
    this.errorMessage = null;
    this.currentUserId = parseInt(this.route.snapshot.paramMap.get('user')!);
  }

  ngOnInit() {
    const currentRestaurantId = parseInt(
      this.route.snapshot.paramMap.get('id')!
    );

    this.restaurantOwnerService
      .getRestaurantOwnerDashboard(this.currentUserId)
      .subscribe({
        next: (data) => {
          this.authService.setCurrentUser(data);
        }
      });

    if (currentRestaurantId) {
      this.restaurantService
        .getRestaurantDashboard(currentRestaurantId, this.currentUserId)
        .subscribe({
          next: (data) => {
            this.currentRestaurant = data;
            this.isAvailable = data.is_available.data[0];
          },
          error: (error) => {
            console.error(
              "Une erreur s'est produite lors de la récupération des données du restaurant.",
              error
            );
            this.router.navigate(['']);
          }
        });
    } else {
      console.error("L'ID du restaurant n'est pas un nombre valide.");
      this.router.navigate(['']);
    }

    this.productService
      .getProductsByRestaurantId(currentRestaurantId)
      .subscribe((data) => {
        this.currentProducts = data;

        if (this.currentProducts.length > 0) {
          this.currentProducts.forEach(async (product: Product) => {
            this.customerService
              .getUserIdByProductId(product, this.currentUserId)
              .subscribe({
                next: (results) => {
                  this.usersIdsHasReserved = results;
                  this.usersIdsHasReserved.forEach(
                    (user: any) => {
                      this.customerService
                        .getDataCustomer(user.user_id, this.currentUserId)
                        .subscribe({
                          next: (result) => {
                            this.userHasReserved = result;
                            this.productReserved = product;
                          },
                          error: (error) => {
                            console.error(error);
                          }
                        });
                    },
                    (error: Error) => {
                      console.error(error);
                    }
                  );
                },
                error: (error) => {
                  console.error(
                    "Une erreur s'est produite lors de la récupération des formules du restaurant.",
                    error
                  );
                }
              });
          });
        }
      });
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
    modalRef.componentInstance.currentUserId = this.currentUserId;
  }

  updateAvailability() {
    this.restaurantService
      .updateAvailability(this.currentRestaurant, this.isAvailable)
      .subscribe({
        next: () => {
          this.successMessage =
            'La disponibilité du restaurant a bien été prise en compte !';
        },
        error: (error) => {
          this.errorMessage = 'Une erreur est survenue !';
          console.error(
            "Une erreur s'est produite lors de la récupération des données du restaurant.",
            error
          );
        }
      });
  }

  openPopupToCreateProduct() {
    const modalRef = this.modalService.open(PopupCreateProductComponent);
    modalRef.componentInstance.currentRestaurant = this.currentRestaurant;
    modalRef.componentInstance.currentUserId = this.currentUserId;
  }

  deleteProduct(currentProduct: Product) {
    this.productService
      .deleteProduct(currentProduct, this.currentUserId)
      .subscribe({
        next: () => {
          this.ngOnInit();
        },
        error: (error) => {
          console.error(
            "Une erreur s'est produite lors de la suppression du produit.",
            error
          );
        }
      });
  }
}
