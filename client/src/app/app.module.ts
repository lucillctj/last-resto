import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateAccountCustomerComponent } from './components/create-account-customer/create-account-customer.component';
import { SignUpCustomerComponent } from './pages/sign-up/sign-up-customer/sign-up-customer.component';
import { CreateAccountRestaurantComponent } from "./components/create-account-restaurant/create-account-restaurant.component";
import { SignUpRestaurantOwnerComponent } from './pages/sign-up/sign-up-restaurant-owner/sign-up-restaurant-owner.component';
import {CustomerService} from "./services/api/customer.service";
import {RestaurantOwnerService} from "./services/api/restaurant-owner.service";
import { CustomerDashboardComponent } from './pages/user-dashboard/customer-dashboard/customer-dashboard.component';
import { RestaurantOwnerDashboardComponent } from './pages/user-dashboard/restaurant-owner-dashboard/restaurant-owner-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopupUpdateCustomerComponent } from './components/popup-update-customer/popup-update-customer.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import {
  PopupUpdateRestaurantOwnerComponent
} from "./components/popup-update-restaurant-owner/popup-update-restaurant-owner.component";
import { RestaurantDashboardComponent } from './pages/restaurant-dashboard/restaurant-dashboard.component';
import { PopupUpdateRestaurantComponent } from './components/popup-update-restaurant/popup-update-restaurant.component';
import { PopupDeleteUserComponent } from './components/popup-delete-user/popup-delete-user.component';
import { NavBarCustomerComponent } from './components/nav-bars/nav-bar-customer/nav-bar-customer.component';
import { NavBarRestaurantOwnerComponent } from './components/nav-bars/nav-bar-restaurant-owner/nav-bar-restaurant-owner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateAccountCustomerComponent,
    SignUpCustomerComponent,
    CreateAccountRestaurantComponent,
    SignUpRestaurantOwnerComponent,
    CustomerDashboardComponent,
    RestaurantOwnerDashboardComponent,
    PopupUpdateCustomerComponent,
    PopupUpdateRestaurantOwnerComponent,
    LogInComponent,
    RestaurantDashboardComponent,
    PopupUpdateRestaurantComponent,
    PopupDeleteUserComponent,
    NavBarCustomerComponent,
    NavBarRestaurantOwnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [CustomerService, RestaurantOwnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
