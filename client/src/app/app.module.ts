import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateAccountCustomerComponent } from './components/create-account-customer/create-account-customer.component';
import { SignUpCustomerComponent } from './pages/sign-up/sign-up-customer/sign-up-customer.component';
import { CreateAccountRestaurantComponent } from "./components/create-account-restaurant/create-account-restaurant.component";
import { SignUpRestaurantOwnerComponent } from './pages/sign-up/sign-up-restaurant-owner/sign-up-restaurant-owner.component';
import {CustomerService} from "./services/api/customer.service";
import {RestaurantOwnerService} from "./services/api/restaurant-owner.service";
import { CustomerProfilComponent } from './pages/user-profil/customer-profil/customer-profil.component';
import { RestaurantOwnerProfilComponent } from './pages/user-profil/restaurant-owner-profil/restaurant-owner-profil.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopupUpdateCustomerComponent } from './components/popup-update-customer/popup-update-customer.component';
import { LogInComponent } from './pages/log-in/log-in/log-in.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateAccountCustomerComponent,
    SignUpCustomerComponent,
    CreateAccountRestaurantComponent,
    SignUpRestaurantOwnerComponent,
    CustomerProfilComponent,
    RestaurantOwnerProfilComponent,
    PopupUpdateCustomerComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [CustomerService, RestaurantOwnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
