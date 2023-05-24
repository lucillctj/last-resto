import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from "../../../../services/auth.service";
import {Restaurant} from "../../../../interfaces/restaurant-interface";
import {ProductService} from "../../../../services/api/product.service";
import {Product} from "../../../../interfaces/product-interface";

@Component({
  selector: 'app-popup-create-product',
  templateUrl: './popup-create-product.component.html',
  styleUrls: ['./popup-create-product.component.scss', '../../../../../styles.scss']
})
export class PopupCreateProductComponent {
  @Input() currentRestaurant!: Restaurant;
  submitted = false;
  newProduct: Product;
  successMessage: string | null;
  errorMessage: string | null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal
  )
  {
    this.currentRestaurant = {} as Restaurant;
    this.newProduct = {} as Product;
    this.successMessage = null;
    this.errorMessage = null;
  }

  onSubmit() {
    this.submitted = true;

    this.newProduct.restaurant_id = this.currentRestaurant.restaurant_id;
    this.productService.createProduct(this.newProduct)
      .subscribe(() => {
          this.successMessage = 'Votre formule a bien été créé !';
          setTimeout(() => {
            this.router.navigate([`/api/v1/restaurants/dashboard/${this.currentRestaurant.restaurant_id}`]);
            this.modalService.dismissAll()
          }, 2000)
        },
        error => {
          console.log('Erreur lors de la création de la formule :', error);
          this.errorMessage = 'Erreur lors de la création de la formule, veuillez réessayer ultérieurement.';
        })
  }

  redirectToDashboard(){
    this.modalService.dismissAll()
  }
}
