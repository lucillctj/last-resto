import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Customer } from '../../../../interfaces/customer-interface';
import { Product } from '../../../../interfaces/product-interface';
import { Restaurant } from '../../../../interfaces/restaurant-interface';
import { CustomerService } from '../../../../services/api/customer.service';
import { ProductService } from '../../../../services/api/product.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-popup-detail-restaurant',
  templateUrl: './popup-detail-restaurant.component.html',
  styleUrls: [
    './popup-detail-restaurant.component.scss',
    '../../../../../styles.scss'
  ]
})
export class PopupDetailRestaurantComponent implements OnInit {
  @Input() currentRestaurant!: Restaurant;

  selectedProduct: Product | undefined;
  submitted = false;
  successMessage: string | null;
  errorMessage: string | null;
  errorMessageNotLoggedIn: string | null;
  currentProducts: Product[];
  currentCustomer: Customer;
  errorMessageNotAvailable!: string | null;
  isAvailable!: boolean;
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private customerService: CustomerService,
    private modalService: NgbModal
  ) {
    this.selectedProduct = undefined;
    this.successMessage = null;
    this.errorMessage = null;
    this.errorMessageNotLoggedIn = null;
    this.currentProducts = [];
    this.currentCustomer = {} as Customer;
  }

  ngOnInit() {
    const currentRestaurantId = this.currentRestaurant.restaurant_id;
    const currentUserId = parseInt(this.route.snapshot.paramMap.get('user')!);
    this.isAvailable = this.currentRestaurant.is_available.data[0];
    if (!this.isAvailable) {
      this.errorMessageNotAvailable =
        "Ce restaurant n'est pas disponible, vous ne pouvez pas réserver.";
    }

    this.productService
      .getProductsByRestaurantId(currentRestaurantId!, currentUserId)
      .subscribe({
        next: (data) => {
          this.currentProducts = data;
        },
        error: (error) => {
          console.error(
            "Une erreur s'est produite lors de la récupération des données des formules.",
            error
          );
        }
      });
  }

  clickToBook() {
    if (this.selectedProduct) {
      this.authService.getCurrentUser().subscribe((currentUser) => {
        this.currentCustomer = currentUser as Customer;
        if (!this.currentCustomer) {
          this.errorMessageNotLoggedIn =
            'Vous devez être connecté pour pouvoir réserver !';
          return;
        }

        else if (this.currentCustomer.product_id) {
          this.errorMessage =
            'Vous avez déjà une réservation en cours, supprimez-la si vous souhaitez en effectuer une nouvelle.';
          return;
        }

        else {
          this.customerService
          .updateProductId(
            this.currentCustomer.user_id,
            this.selectedProduct!.product_id
          )
          .subscribe({
            next: () => {
              this.successMessage =
                'Votre réservation a bien été prise en compte !';
              setTimeout(() => {
                this.router.navigate(['/restaurants']);
                this.modalService.dismissAll();
              }, 2000);
            },
            error: () => {
              this.errorMessage =
                'Une erreur est survenue lors de votre réservation, veuillez réessayer.';
            }
          })
        };
      });
    }
  }

  redirectToHomePage() {
    this.modalService.dismissAll();
    this.router.navigate(['']);
  }

  closePopup() {
    this.modalService.dismissAll();
  }
}
