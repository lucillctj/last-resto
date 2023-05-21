import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../../services/api/user.service";
import {User} from "../../interfaces/user-interface";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss', '../../../styles.scss']
})
export class LogInComponent {
  user: User;
  errorMessage: string| null;
  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    this.user = {} as User;
    this.errorMessage = null;
  }

  loginToAccount(user: User){
    this.userService.login(user)
      .subscribe((res) => {
          this.authService.setCurrentUser(user);
          this.router.navigate([`/api/v1/customers/dashboard/${res.userId}`]);
        },
        error => {
          if (error.status === 401 && error.error === "Aucun utilisateur trouvé !") {
            this.errorMessage = 'Aucun utilisateur trouvé !';
          }
          else if (error.status === 401 && error.error === "Mot de passe invalide") {
            this.errorMessage = 'Mot de passe invalide';
          }
          else if (error.status === 400){
            this.errorMessage = 'Certains champs sont manquants.';
          }
          else{
            this.errorMessage = 'Erreur lors de l\'inscription, veuillez rééssayer ultérieurement.';
          }
        }
      )
  }

}
