import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/user-interface';
import { UserService } from '../../../services/api/user.service';

@Component({
  selector: 'app-nav-bar-top',
  templateUrl: './nav-bar-top.component.html',
  styleUrls: ['./nav-bar-top.component.scss']
})
export class NavBarTopComponent implements OnInit {
  currentUser: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.currentUser = {} as User;
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

  // ngOnChanges(){
  //   this.authService.getCurrentUser().subscribe(user => {
  //     this.currentUser = user;
  //   });  }

  redirectToRestaurantsList() {
    this.router.navigate(['']);
  }

  redirectToUserDashboard() {
    if (this.currentUser.role === 'customer') {
      this.router.navigate([
        `/customers/dashboard/${this.currentUser.user_id}`
      ]);
    } else if (this.currentUser.role === 'restaurant owner') {
      this.router.navigate([
        `/restaurant-owners/dashboard/${this.currentUser.user_id}`
      ]);
    }
  }

  login() {
    this.router.navigate(['/users/login']);
  }

  logout() {
    this.authService.forgetUser();
    this.authService.setCurrentUser(null);
    this.userService.logout().subscribe(
      () => {
        this.router.navigate(['']);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
