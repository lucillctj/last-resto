import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../services/auth.service';
import { Restaurant } from '../../../../interfaces/restaurant-interface';
import { ProductService } from '../../../../services/api/product.service';
import { Product } from '../../../../interfaces/product-interface';

@Component({
  selector: 'app-popup-create-product',
  templateUrl: './popup-create-product.component.html',
  styleUrls: [
    './popup-create-product.component.scss',
    '../../../../../styles.scss'
  ]
})
export class PopupCreateProductComponent {
  @Input() currentRestaurant!: Restaurant;
  @Input() currentUserId!: number;

  submitted = false;
  newProduct: Product;
  successMessage: string | null;
  errorMessage: string | null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    this.currentRestaurant = {} as Restaurant;
    this.newProduct = {} as Product;
    this.successMessage = null;
    this.errorMessage = null;
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (!form.valid) {
      return;
    }
    this.newProduct.restaurant_id = this.currentRestaurant.restaurant_id;
    this.productService
      .createProduct(this.newProduct, this.currentUserId)
      .subscribe(
        () => {
          location.reload();
          this.modalService.dismissAll();
        },
        (_) => {
          this.errorMessage =
            'Erreur lors de la création de la formule, veuillez réessayer ultérieurement.';
        }
      );
  }

  closePopup() {
    this.modalService.dismissAll();
  }
}
