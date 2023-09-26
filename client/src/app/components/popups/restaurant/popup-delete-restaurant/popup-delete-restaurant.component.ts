import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../../../interfaces/product-interface';
import { Restaurant } from '../../../../interfaces/restaurant-interface';
import { CustomerService } from '../../../../services/api/customer.service';
import { ProductService } from '../../../../services/api/product.service';
import { RestaurantService } from '../../../../services/api/restaurant.service';

@Component({
  selector: 'app-popup-delete-restaurant',
  templateUrl: './popup-delete-restaurant.component.html',
  styleUrls: [
    './popup-delete-restaurant.component.scss',
    '../../../../../styles.scss'
  ]
})
export class PopupDeleteRestaurantComponent {
  @Input() currentRestaurant!: Restaurant;
  @Input() currentProducts!: Product[];
  @Input() currentUserId!: number;

  successMessage: string | null;
  errorMessage: string | null;

  constructor(
    private restaurantService: RestaurantService,
    private productService: ProductService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.successMessage = null;
    this.errorMessage = null;
  }

  confirmToDelete() {
    this.currentProducts.forEach(async (product: Product) => {
      this.customerService
        .getUserIdByProductId(product, this.currentUserId)
        .subscribe({
          next: (results) => {
            results.forEach((res: any) => {
              this.customerService
                .updateProductId(res.user_id, null)
                .subscribe({
                  next: (results) => {
                    console.log(results);
                  },
                  error: (error) => {
                    console.error(error);
                  }
                });
            });
          },
          error: (error) => {
            console.error(error);
          }
        });
    });

    if (this.currentProducts.length > 0) {
      this.currentProducts.forEach(async (product: Product) => {
        this.productService
          .deleteProduct(product, this.currentUserId)
          .subscribe({
            next: () => {
              console.log('produit supprimé :', product.name);
              this.router.navigate([
                `/restaurant-owners/dashboard/${this.currentUserId}`
              ]);
            },
            error: (error) => {
              console.error(
                "Une erreur s'est produite lors de la suppression du produit.",
                error
              );
            }
          });
      });
    }

    this.restaurantService.deleteRestaurant(this.currentRestaurant).subscribe({
      next: () => {
        this.successMessage = 'Votre restaurant a bien été supprimé !';
        setTimeout(() => {
          this.router.navigate([
            `/restaurant-owners/dashboard/${this.currentUserId}`
          ]);
          this.modalService.dismissAll();
        }, 2000);
      },
      error: () => {
        this.errorMessage =
          'Erreur lors de la suppression du restaurant, veuillez réessayer ultérieurement.';
      }
    });
  }

  closePopup() {
    this.modalService.dismissAll();
  }
}
