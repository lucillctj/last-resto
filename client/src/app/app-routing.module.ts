import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {SignUpCustomerComponent} from "./pages/sign-up-customer/sign-up-customer.component";
import {SignUpRestaurantComponent} from "./pages/sign-up-restaurant/sign-up-restaurant.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-up-customer', component: SignUpCustomerComponent },
  { path: 'sign-up-restaurant', component: SignUpRestaurantComponent }

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
