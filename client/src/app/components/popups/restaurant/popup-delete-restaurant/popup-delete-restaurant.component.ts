import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from "../../../../services/auth.service";
import {Restaurant} from "../../../../interfaces/restaurant-interface";
import {RestaurantService} from "../../../../services/api/restaurant.service";
import {Product} from "../../../../interfaces/product-interface";
import {ProductService} from "../../../../services/api/product.service";
import {CustomerService} from "../../../../services/api/customer.service";

@Component({
  selector: 'app-popup-delete-restaurant',
  templateUrl: './popup-delete-restaurant.component.html',
  styleUrls: ['./popup-delete-restaurant.component.scss', '../../../../../styles.scss']
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
    private authService: AuthService,
    private modalService: NgbModal
  )
  {
    this.successMessage = null;
    this.errorMessage = null;
  }

  confirmToDelete() {
    this.currentProducts.forEach(async (product: Product) => {
      await this.customerService.getUserIdByProductId(product, this.currentUserId)
        .subscribe((results) => {
            results.forEach((res: any) => {
              this.customerService.updateProductId(res.user_id, null)
                .subscribe((results) => {
                    console.log(results)
                  },
                  (error) => {
                    console.error(error);
                  })
            })
          },
          (error) => {
            console.error(error);
          })
    })

    if(this.currentProducts.length > 0){
      this.currentProducts.forEach(async (product: Product) => {
        this.productService.deleteProduct(product, this.currentUserId)
          .subscribe(() => {
              console.log('produit supprimé', product.name);
            },
            (error) => {
              console.error('Une erreur s\'est produite lors de la suppression du produit.', error);
            })
      })
    }

    this.restaurantService.deleteRestaurant(this.currentRestaurant)
      .subscribe(() => {
          this.successMessage = 'Votre restaurant a bien été supprimé !';
          setTimeout(() => {
            this.router.navigate([`/api/v1/restaurant-owners/dashboard/${this.currentUserId}`]);
            this.modalService.dismissAll()
          }, 2000)
        },
        error => {
          this.errorMessage = 'Erreur lors de la suppression du restaurant, veuillez réessayer ultérieurement.';
        })
  }

  redirectToDashboard(){
    this.modalService.dismissAll()
  }
}
