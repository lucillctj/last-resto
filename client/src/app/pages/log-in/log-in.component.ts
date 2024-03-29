import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/api/user.service';
import { User } from '../../interfaces/user-interface';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss', '../../../styles.scss']
})
export class LogInComponent {
  user: User;
  errorMessage: string | null;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.user = {} as User;
    this.errorMessage = null;
  }

  loginToAccount(email: string, password: string) {
    this.userService.login(email, password).subscribe({
      next: (res) => {
        if (res.userRole === 'customer') {
          this.router.navigate([`/customers/dashboard/${res.userId}`]);
        } else if (res.userRole === 'restaurant owner') {
          this.router.navigate([`/restaurant-owners/dashboard/${res.userId}`]);
        }
      },
      error: (error) => {
        console.log('error', error);
        if (
          error.status === 401 &&
          error.error.message === 'Aucun utilisateur trouvé !'
        ) {
          this.errorMessage = 'Aucun utilisateur trouvé !';
        } else if (
          error.status === 401 &&
          error.error.message === 'Mot de passe invalide'
        ) {
          this.errorMessage = 'Mot de passe invalide';
        } else {
          this.errorMessage =
            'Erreur lors de la connexion, veuillez rééssayer ultérieurement.';
        }
      }
    });
  }
}
