import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {SignUpCustomerComponent} from "./pages/sign-up/sign-up-customer/sign-up-customer.component";
import {SignUpRestaurantOwnerComponent} from "./pages/sign-up/sign-up-restaurant-owner/sign-up-restaurant-owner.component";
import {CustomerProfilComponent} from "./pages/user-profil/customer-profil/customer-profil.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'customer-sign-up', component: SignUpCustomerComponent },
  { path: 'restaurant-owner-sign-up', component: SignUpRestaurantOwnerComponent },
  { path: 'sign-up-customer', component: SignUpCustomerComponent },
  { path: 'sign-up-restaurant-owner', component: SignUpRestaurantOwnerComponent },
  { path: 'customer-profil', component: CustomerProfilComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }