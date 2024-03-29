import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignUpCustomerComponent } from './pages/sign-up/sign-up-customer/sign-up-customer.component';
import { SignUpRestaurantOwnerComponent } from './pages/sign-up/sign-up-restaurant-owner/sign-up-restaurant-owner.component';
import { CustomerDashboardComponent } from './pages/user-dashboard/customer-dashboard/customer-dashboard.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { RestaurantOwnerDashboardComponent } from './pages/user-dashboard/restaurant-owner-dashboard/restaurant-owner-dashboard.component';
import { RestaurantDashboardComponent } from './pages/restaurant-dashboard/restaurant-dashboard.component';
import { RestaurantsListComponent } from './pages/restaurants-list/restaurants-list.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'customers/signup', component: SignUpCustomerComponent },
  {
    path: 'restaurant-owners/signup',
    component: SignUpRestaurantOwnerComponent
  },
  { path: 'users/login', component: LogInComponent },
  { path: 'customers/dashboard/:user', component: CustomerDashboardComponent },
  {
    path: 'restaurant-owners/dashboard/:user',
    component: RestaurantOwnerDashboardComponent
  },
  {
    path: 'restaurants/dashboard/:id/user/:user',
    component: RestaurantDashboardComponent
  },
  { path: 'restaurants', component: RestaurantsListComponent },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
