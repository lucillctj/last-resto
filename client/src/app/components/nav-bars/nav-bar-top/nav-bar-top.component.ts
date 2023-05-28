import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../interfaces/user-interface";
import {UserService} from "../../../services/api/user.service";

@Component({
  selector: 'app-nav-bar-top',
  templateUrl: './nav-bar-top.component.html',
  styleUrls: ['./nav-bar-top.component.scss']
})
export class NavBarTopComponent implements OnInit{
  currentUser: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.currentUser = {} as User;
  }

  ngOnInit(){
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnChanges(){
    this.currentUser = this.authService.getCurrentUser();
    console.log('2---->', this.currentUser)

  }

  redirectToRestaurantsList(){
    this.router.navigate(['/api/v1/restaurants']);
  }

  login(){
    this.router.navigate(['/api/v1/users/login']);
  }

  async logout() {
    this.authService.forgetUser();
    this.authService.setCurrentUser(null);
    await this.userService.logout();
    this.router.navigate(['api/v1']);
  }

}
