import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer-interface';
import { RestaurantOwner } from 'src/app/interfaces/restaurantOwner-interface';
import { User } from '../../../interfaces/user-interface';
import { UserService } from '../../../services/api/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nav-bar-top',
  templateUrl: './nav-bar-top.component.html',
  styleUrls: ['./nav-bar-top.component.scss']
})
export class NavBarTopComponent implements OnInit {
  currentUser: User | Customer | RestaurantOwner | null;

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

  redirectToHome() {
    this.router.navigate(['']);
  }

  redirectToUserDashboard() {
    if (this.currentUser!.role === 'customer') {
      this.router.navigate([
        `/customers/dashboard/${this.currentUser!.user_id}`
      ]);
    } else if (this.currentUser!.role === 'restaurant owner') {
      this.router.navigate([
        `/restaurant-owners/dashboard/${this.currentUser!.user_id}`
      ]);
    }
  }

  login() {
    this.router.navigate(['/users/login']);
  }

  logout() {
    this.authService.forgetUser();
    this.authService.setCurrentUser(null);
    this.userService.logout().subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (error) => {
        console.log('error', error);
      }
    });
  }
}
