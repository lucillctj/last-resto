import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateAccountCustomerComponent } from './create-account-customer/create-account-customer.component';
import { SignUpCustomerComponent } from './pages/sign-up-customer/sign-up-customer.component';
import { CreateAccountRestaurantComponent } from "./create-account-restaurant/create-account-restaurant.component";
import { SignUpRestaurantComponent } from './pages/sign-up-restaurant/sign-up-restaurant.component';

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

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
