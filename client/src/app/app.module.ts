import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateAccountCustomerComponent } from './create-account-customer/create-account-customer.component';
import { SignUpCustomerComponent } from './pages/sign-up-customer/sign-up-customer.component';
import { CreateAccountRestaurantComponent } from "./create-account-restaurant/create-account-restaurant.component";
import { SignUpRestaurantComponent } from './pages/sign-up-restaurant/sign-up-restaurant.component';
import {CustomerService} from "./service/customer-service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateAccountCustomerComponent,
    SignUpCustomerComponent,
    CreateAccountRestaurantComponent,
    SignUpRestaurantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
