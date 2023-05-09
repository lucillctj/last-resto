import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {SignUpCustomerComponent} from "./pages/sign-up/sign-up-customer/sign-up-customer.component";
import {SignUpRestaurantOwnerComponent} from "./pages/sign-up/sign-up-restaurant-owner/sign-up-restaurant-owner.component";
import {CustomerProfilComponent} from "./pages/user-profil/customer-profil/customer-profil.component";
import {LogInComponent} from "./pages/log-in/log-in/log-in.component";
import {
  RestaurantOwnerProfilComponent
} from "./pages/user-profil/restaurant-owner-profil/restaurant-owner-profil.component";
import {RestaurantPageComponent} from "./pages/restaurant-page/restaurant-page.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup-customer', component: SignUpCustomerComponent },
  { path: 'signup-restaurant-owner', component: SignUpRestaurantOwnerComponent },
  { path: 'login', component: LogInComponent },
  { path: 'api/v1/customers/dashboard/:id', component: CustomerProfilComponent },
  { path: 'api/v1/restaurant-owners/dashboard/:id', component: RestaurantOwnerProfilComponent },
  { path: 'api/v1/restaurants/dashboard/:id', component: RestaurantPageComponent }

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
